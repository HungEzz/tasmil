import { openai } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        // OpenAI Models (GPT-4o)
        "chat-model": openai("gpt-4o"),
        "chat-model-reasoning": wrapLanguageModel({
          model: openai("gpt-4o"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": openai("gpt-4o-mini"),
        "artifact-model": openai("gpt-4o"),
        
        // Alternative models (uncomment to use)
        // XAI Models (Grok)
      //   languageModels: {
      //   "chat-model": gateway.languageModel("xai/grok-2-vision-1212"),
      //   "chat-model-reasoning": wrapLanguageModel({
      //     model: gateway.languageModel("xai/grok-3-mini"),
      //     middleware: extractReasoningMiddleware({ tagName: "think" }),
      //   }),
      //   "title-model": gateway.languageModel("xai/grok-2-1212"),
      //   "artifact-model": gateway.languageModel("xai/grok-2-1212"),
      // },
        
        // Anthropic models (uncomment to use)
        // "chat-model": anthropic("claude-3-5-sonnet-20241022"),
        // "chat-model-reasoning": wrapLanguageModel({
        //   model: anthropic("claude-3-5-sonnet-20241022"),
        //   middleware: extractReasoningMiddleware({ tagName: "think" }),
        // }),
        // "title-model": anthropic("claude-3-5-haiku-20241022"),
        // "artifact-model": anthropic("claude-3-5-sonnet-20241022"),
      },
    });
