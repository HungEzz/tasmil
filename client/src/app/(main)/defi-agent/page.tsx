import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { auth } from "@/app/(auth)/auth";
import { DefiAgentClient } from "@/app/(main)/defi-agent/defi-agent-client";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/guest");
  }

  const id = generateUUID();
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  return (
    <DefiAgentClient
      id={id}
      initialChatModel={modelIdFromCookie?.value || DEFAULT_CHAT_MODEL}
    />
  );
}
