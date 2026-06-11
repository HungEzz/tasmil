"use client";

import type { User } from "next-auth";
import { DefiAgentSidebar } from "@/components/defi-agent-sidebar";
import { DefiAgentHeader } from "@/components/defi-agent-header";
import { useDefiAgentSidebar } from "@/context/defi-agent-sidebar-context";
import { cn } from "@/lib/utils";

interface DefiAgentLayoutProps {
  children: React.ReactNode;
  user: User | undefined;
}

export function DefiAgentLayout({ children, user }: DefiAgentLayoutProps) {
  const { isOpen: isSidebarOpen, toggle: toggleSidebar } =
    useDefiAgentSidebar();

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Main content */}
      <div
        className={cn(
          "h-full flex flex-col transition-all duration-300 ease-in-out",
          // On desktop, adjust margin when sidebar is open
          "md:transition-[margin-right]",
          isSidebarOpen ? "md:mr-80" : "md:mr-0"
        )}
      >
        {/* Header */}
        <DefiAgentHeader />

        {/* Page content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>

      {/* Custom sidebar */}
      <DefiAgentSidebar
        user={user}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
    </div>
  );
}
