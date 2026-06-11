"use client";

import { memo } from "react";
import { DefiAgentSidebarToggle } from "@/components/defi-agent-sidebar-toggle";
import { DefiAgentControls } from "@/components/defi-agent-controls";
import type { VisibilityType } from "./visibility-selector";

function ChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  return (
    <header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
      <DefiAgentSidebarToggle />

      <div className="flex items-center gap-2 ml-auto">
        <DefiAgentControls
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
          showNewChatButton={true}
          showVisibilitySelector={true}
        />
      </div>
    </header>
  );
}

export const DefiAgentChatHeader = memo(ChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
