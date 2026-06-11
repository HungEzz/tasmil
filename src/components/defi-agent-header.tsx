"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { TopNav } from "@/components/layout/top-nav";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { DefiAgentControls } from "./defi-agent-controls";
import { DefiAgentSidebarToggle } from "./defi-agent-sidebar-toggle";

interface DefiAgentHeaderProps {
  className?: string;
}

export function DefiAgentHeader({ className }: DefiAgentHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center gap-3 sm:gap-4 bg-background border-b border-border p-4 h-16 w-full",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <SidebarTrigger
        variant="outline"
        className="scale-125 sm:scale-100 z-10"
      />
      <Separator orientation="vertical" className="h-6" />
      <TopNav
        header={{
          title: "DeFi Agent",
          description:
            "Discover and interact with AI-powered DeFi trading agents",
          icon: "/images/defi-agent.png",
        }}
      />
      <div className="ml-auto flex items-center space-x-4">
        <DefiAgentControls
          showNewChatButton={true}
          showVisibilitySelector={false}
        />
        <DefiAgentSidebarToggle />
      </div>
    </header>
  );
}
