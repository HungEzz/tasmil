"use client";

import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useDefiAgentSidebar } from "@/context/defi-agent-sidebar-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";

export function DefiAgentSidebarToggle({
  className,
  ...props
}: ComponentProps<typeof SidebarTrigger>) {
  const pathname = usePathname();
  const isDefiAgent = pathname?.startsWith("/defi-agent");

  // Use DeFi Agent context if in DeFi Agent route, otherwise use regular sidebar
  const defiAgentSidebar = isDefiAgent ? useDefiAgentSidebar() : null;
  const regularSidebar = useSidebar();

  const handleToggle = () => {
    if (isDefiAgent && defiAgentSidebar) {
      defiAgentSidebar.toggle();
    } else {
      regularSidebar.toggleSidebar();
    }
  };

  if (isDefiAgent) {
    // Custom implementation for DeFi Agent
    return (
      <Button
        className={cn("h-8 px-2 md:h-fit md:px-2", className)}
        data-testid="sidebar-toggle-button"
        onClick={handleToggle}
        variant="outline"
        {...props}
      >
        <Clock size={16} />
      </Button>
    );
  }

  // Use regular SidebarTrigger for non-DeFi Agent routes
  return (
    <SidebarTrigger className={className} onClick={handleToggle} {...props} />
  );
}
