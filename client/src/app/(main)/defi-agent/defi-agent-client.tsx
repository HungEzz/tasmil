"use client";

import { useEffect } from "react";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { useNavigation } from "@/context/nav-context";

interface DefiAgentClientProps {
  id: string;
  initialChatModel: string;
}

export function DefiAgentClient({
  id,
  initialChatModel,
}: DefiAgentClientProps) {
  const { setNavItems } = useNavigation();

  return (
    <>
      <Chat
        autoResume={false}
        id={id}
        initialChatModel={initialChatModel}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        key={id}
      />
      <DataStreamHandler />
    </>
  );
}
