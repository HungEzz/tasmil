"use client";

import { useRouter } from "next/navigation";
import { useWindowSize } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "./icons";
import { useDefiAgentSidebar } from "@/context/defi-agent-sidebar-context";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

interface DefiAgentControlsProps {
  chatId?: string;
  selectedVisibilityType?: VisibilityType;
  isReadonly?: boolean;
  showNewChatButton?: boolean;
  showVisibilitySelector?: boolean;
}

export function DefiAgentControls({
  chatId,
  selectedVisibilityType = "private",
  isReadonly = false,
  showNewChatButton = true,
  showVisibilitySelector = false,
}: DefiAgentControlsProps) {
  const router = useRouter();
  const { isOpen } = useDefiAgentSidebar();
  const { width: windowWidth } = useWindowSize();

  return (
    <div className="flex items-center gap-2">
      {/* New Chat Button */}
      {showNewChatButton && (!isOpen || windowWidth < 768) && (
        <Button
          className="h-8 px-2 md:h-fit md:px-2"
          onClick={() => {
            router.push("/defi-agent");
            router.refresh();
          }}
          variant="outline"
        >
          <PlusIcon />
          <span className="md:sr-only">New Chat</span>
        </Button>
      )}

      {/* Visibility Selector */}
      {showVisibilitySelector && !isReadonly && chatId && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
        />
      )}
    </div>
  );
}
