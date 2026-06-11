import { geolocation } from "@vercel/functions";
import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  smoothStream,
  stepCountIs,
  streamText,
  tool,
} from "ai";
import { z } from "zod";
import { fetchAptosCoins, calculateTokenData } from "@/lib/aptos/aptos-helpers";
import { TOKENS } from "@/constants/token";
import { API_BASE_URL } from "@/constants/routes";
import { unstable_cache as cache } from "next/cache";
import { after } from "next/server";
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from "resumable-stream";
import type { ModelCatalog } from "tokenlens/core";
import { fetchModels } from "tokenlens/fetch";
import { getUsage } from "tokenlens/helpers";
import { auth, type UserType } from "@/app/(auth)/auth";
import type { VisibilityType } from "@/components/visibility-selector";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import type { ChatModel } from "@/lib/ai/models";
import { type RequestHints, systemPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { createDocument } from "@/lib/ai/tools/create-document";
import { getWeather } from "@/lib/ai/tools/get-weather";
import { requestSuggestions } from "@/lib/ai/tools/request-suggestions";
import { updateDocument } from "@/lib/ai/tools/update-document";
import { isProductionEnvironment } from "@/lib/constants";
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessageCountByUserId,
  getMessagesByChatId,
  saveChat,
  saveMessages,
  updateChatLastContextById,
} from "@/lib/db/queries";
import { ChatSDKError } from "@/lib/errors";
import type { ChatMessage } from "@/lib/types";
import type { AppUsage } from "@/lib/usage";
import { convertToUIMessages, generateUUID } from "@/lib/utils";
import { generateTitleFromUserMessage } from "../../actions";
import { type PostRequestBody, postRequestBodySchema } from "./schema";

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

const getTokenlensCatalog = cache(
  async (): Promise<ModelCatalog | undefined> => {
    try {
      return await fetchModels();
    } catch (err) {
      console.warn(
        "TokenLens: catalog fetch failed, using default catalog",
        err
      );
      return; // tokenlens helpers will fall back to defaultCatalog
    }
  },
  ["tokenlens-catalog"],
  { revalidate: 24 * 60 * 60 } // 24 hours
);

export function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes("REDIS_URL")) {
        console.log(
          " > Resumable streams are disabled due to missing REDIS_URL"
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (_) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  try {
    const {
      id,
      message,
      selectedChatModel,
      selectedVisibilityType,
      walletAddress,
      tasmilAddress,
    }: {
      id: string;
      message: ChatMessage;
      selectedChatModel: ChatModel["id"];
      selectedVisibilityType: VisibilityType;
      walletAddress?: string | null;
      tasmilAddress?: string | null;
    } = requestBody;

    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    const userType: UserType = session.user.type;

    const messageCount = await getMessageCountByUserId({
      id: session.user.id,
      differenceInHours: 24,
    });

    if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
      return new ChatSDKError("rate_limit:chat").toResponse();
    }

    const chat = await getChatById({ id });

    if (chat) {
      if (chat.userId !== session.user.id) {
        return new ChatSDKError("forbidden:chat").toResponse();
      }
    } else {
      const title = await generateTitleFromUserMessage({
        message,
      });

      await saveChat({
        id,
        userId: session.user.id,
        title,
        visibility: selectedVisibilityType,
      });
    }

    const messagesFromDb = await getMessagesByChatId({ id });
    const uiMessages = [...convertToUIMessages(messagesFromDb), message];

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    await saveMessages({
      messages: [
        {
          chatId: id,
          id: message.id,
          role: "user",
          parts: message.parts,
          attachments: [],
          createdAt: new Date(),
        },
      ],
    });

    const streamId = generateUUID();
    await createStreamId({ streamId, chatId: id });

    let finalMergedUsage: AppUsage | undefined;

    const stream = createUIMessageStream({
      execute: ({ writer: dataStream }) => {
        const checkWalletBalance = tool({
          description: "Check token balances of the user's connected Aptos wallet and AI-managed Tasmil wallet",
          inputSchema: z.object({}),
          execute: async () => {
            const results: any = {};
            
            if (walletAddress) {
              try {
                const coins = await fetchAptosCoins(walletAddress);
                const tokenData = await calculateTokenData(coins);
                results.connectedWallet = {
                  address: walletAddress,
                  tokens: tokenData.map(t => ({
                    symbol: t.symbol,
                    name: t.name,
                    amount: t.amount,
                    priceUsd: t.price,
                    valueUsd: t.value,
                  })),
                  totalValueUsd: tokenData.reduce((sum, t) => sum + t.value, 0),
                };
              } catch (err) {
                console.error("Error fetching connected wallet balance:", err);
                results.connectedWallet = { address: walletAddress, error: "Failed to fetch balances" };
              }
            }
            
            if (tasmilAddress) {
              try {
                const coins = await fetchAptosCoins(tasmilAddress);
                const tokenData = await calculateTokenData(coins);
                results.tasmilWallet = {
                  address: tasmilAddress,
                  tokens: tokenData.map(t => ({
                    symbol: t.symbol,
                    name: t.name,
                    amount: t.amount,
                    priceUsd: t.price,
                    valueUsd: t.value,
                  })),
                  totalValueUsd: tokenData.reduce((sum, t) => sum + t.value, 0),
                };
              } catch (err) {
                console.error("Error fetching Tasmil wallet balance:", err);
                results.tasmilWallet = { address: tasmilAddress, error: "Failed to fetch balances" };
              }
            }
            
            if (!walletAddress && !tasmilAddress) {
              return { error: "No wallet connected. Please connect your wallet first." };
            }
            
            return results;
          },
        });

        const executeSwap = tool({
          description: "Execute or estimate a token swap on the Aptos network using LiquidSwap. The swap will execute from the user's AI-managed Tasmil wallet.",
          inputSchema: z.object({
            fromTokenSymbol: z.string().describe("The token to swap from, e.g. APT, USDC, USDT, ALT"),
            toTokenSymbol: z.string().describe("The token to swap to, e.g. APT, USDC, USDT, ALT"),
            amount: z.number().positive().describe("The amount of fromToken to swap"),
            estimateOnly: z.boolean().default(false).describe("If true, only calculate the estimate rate without executing the transaction"),
          }),
          execute: async ({ fromTokenSymbol, toTokenSymbol, amount, estimateOnly }) => {
            if (!tasmilAddress) {
              return { error: "No Tasmil wallet found. Please create a Tasmil wallet first to execute swaps." };
            }

            const fromTokenInfo = Object.values(TOKENS).find(
              (t) => t.symbol.toUpperCase() === fromTokenSymbol.toUpperCase()
            );
            const toTokenInfo = Object.values(TOKENS).find(
              (t) => t.symbol.toUpperCase() === toTokenSymbol.toUpperCase()
            );

            if (!fromTokenInfo || !toTokenInfo) {
              return { error: `Unsupported token symbols. Supported: ${Object.keys(TOKENS).join(", ")}` };
            }

            const fromToken = fromTokenInfo.moveAddress || fromTokenInfo.hexAddress;
            const toToken = toTokenInfo.moveAddress || toTokenInfo.hexAddress;

            if (!fromToken || !toToken) {
              return { error: "Could not resolve token address on Aptos." };
            }

            try {
              const isStablePair = 
                ["USDC", "USDT", "DAI"].includes(fromTokenSymbol.toUpperCase()) &&
                ["USDC", "USDT", "DAI"].includes(toTokenSymbol.toUpperCase());
              const curveType = isStablePair ? "stable" : "uncorrelated";

              const endpoint = estimateOnly ? "pre-swap" : "swap";
              
              // Scale fromAmount to smallest unit of fromToken (e.g. 8 decimals for APT/ALT, 6 for USDC/USDT)
              const fromAmount = Math.floor(amount * Math.pow(10, fromTokenInfo.decimals));
              
              // NestJS backend DTO (PreswapRequestDto) requires toAmount, interactiveToken, curveType and version to not be empty
              const toAmount = 0;
              const interactiveToken = "from";
              const version = 0;
              
              const payload = {
                user_address: tasmilAddress,
                fromToken,
                toToken,
                fromAmount,
                toAmount,
                interactiveToken,
                curveType,
                version,
              };

              console.log("Sending swap payload to backend:", payload);

              const response = await fetch(`${API_BASE_URL}/swap/${endpoint}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Cookie: request.headers.get("cookie") || "",
                },
                body: JSON.stringify(payload),
              });

              if (!response.ok) {
                const errorText = await response.text();
                return { error: `Backend swap error: ${errorText}` };
              }

              const resData = await response.json();
              return resData;
            } catch (err: any) {
              console.error("Error executing swap via backend:", err);
              return { error: `Failed to execute swap: ${err.message}` };
            }
          },
        });

        const result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: systemPrompt({ selectedChatModel, requestHints }),
          messages: convertToModelMessages(uiMessages),
          stopWhen: stepCountIs(5),
          experimental_activeTools:
            selectedChatModel === "chat-model-reasoning"
              ? []
              : [
                  "getWeather",
                  "createDocument",
                  "updateDocument",
                  "requestSuggestions",
                  "checkWalletBalance",
                  "executeSwap",
                ],
          experimental_transform: smoothStream({ chunking: "word" }),
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
            }),
            checkWalletBalance,
            executeSwap,
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: "stream-text",
          },
          onFinish: async ({ usage }) => {
            try {
              const providers = await getTokenlensCatalog();
              const modelId =
                myProvider.languageModel(selectedChatModel).modelId;
              if (!modelId) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: "data-usage",
                  data: finalMergedUsage,
                });
                return;
              }

              if (!providers) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: "data-usage",
                  data: finalMergedUsage,
                });
                return;
              }

              const summary = getUsage({ modelId, usage, providers });
              finalMergedUsage = { ...usage, ...summary, modelId } as AppUsage;
              dataStream.write({ type: "data-usage", data: finalMergedUsage });
            } catch (err) {
              console.warn("TokenLens enrichment failed", err);
              finalMergedUsage = usage;
              dataStream.write({ type: "data-usage", data: finalMergedUsage });
            }
          },
        });

        result.consumeStream();

        dataStream.merge(
          result.toUIMessageStream({
            sendReasoning: true,
          })
        );
      },
      generateId: generateUUID,
      onFinish: async ({ messages }) => {
        await saveMessages({
          messages: messages.map((currentMessage) => ({
            id: currentMessage.id,
            role: currentMessage.role,
            parts: currentMessage.parts,
            createdAt: new Date(),
            attachments: [],
            chatId: id,
          })),
        });

        if (finalMergedUsage) {
          try {
            await updateChatLastContextById({
              chatId: id,
              context: finalMergedUsage,
            });
          } catch (err) {
            console.warn("Unable to persist last usage for chat", id, err);
          }
        }
      },
      onError: () => {
        return "Oops, an error occurred!";
      },
    });

    // const streamContext = getStreamContext();

    // if (streamContext) {
    //   return new Response(
    //     await streamContext.resumableStream(streamId, () =>
    //       stream.pipeThrough(new JsonToSseTransformStream())
    //     )
    //   );
    // }

    return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
  } catch (error) {
    const vercelId = request.headers.get("x-vercel-id");

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

    // Check for Gemini/Google API key quota limits (429 / RESOURCE_EXHAUSTED)
    if (
      error instanceof Error &&
      (error.message?.includes("quota") ||
        error.message?.includes("429") ||
        error.message?.includes("RESOURCE_EXHAUSTED") ||
        (error as any).statusCode === 429)
    ) {
      return new ChatSDKError("rate_limit:chat", "Gemini API quota exceeded").toResponse();
    }

    // Check for Vercel AI Gateway credit card error
    if (
      error instanceof Error &&
      error.message?.includes(
        "AI Gateway requires a valid credit card on file to service requests"
      )
    ) {
      return new ChatSDKError("bad_request:activate_gateway").toResponse();
    }

    console.error("Unhandled error in chat API:", error, { vercelId });
    return new ChatSDKError("offline:chat").toResponse();
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  const chat = await getChatById({ id });

  if (chat?.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }

  const deletedChat = await deleteChatById({ id });

  return Response.json(deletedChat, { status: 200 });
}
