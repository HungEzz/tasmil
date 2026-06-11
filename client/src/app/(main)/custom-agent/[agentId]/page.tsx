"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { IconRobot, IconArrowLeft, IconHourglass } from "@tabler/icons-react";

export default function CustomAgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.agentId as string;

  const agentName = React.useMemo(() => {
    if (!agentId) return "Custom Agent";
    return agentId.charAt(0).toUpperCase() + agentId.slice(1);
  }, [agentId]);

  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-[75vh] px-4 w-full">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main glass card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-white/5 bg-background/40 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-6">
        {/* Animated Icon Container */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/15 blur-xl animate-pulse" />
          <div className="relative p-5 bg-gradient-to-b from-blue-500/10 to-purple-500/10 border border-blue-500/10 rounded-full">
            <IconRobot className="w-12 h-12 text-blue-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-1.5 bg-black/80 border border-white/10 rounded-full">
            <IconHourglass className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-2">
          <Typography gradient={true} variant="h3" weight="bold" className="text-2xl sm:text-3xl tracking-tight">
            {agentName} Agent
          </Typography>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Feature Coming Soon
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          We are currently training and configuring <strong>{agentName}</strong> with deep DeFi intelligence and specialized automated strategies on the Aptos blockchain.
        </p>

        {/* Progress bar */}
        <div className="w-full space-y-2 pt-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Model Integration</span>
            <span className="font-semibold text-blue-400">85% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-[85%] animate-pulse" />
          </div>
        </div>

        {/* Actions */}
        <div className="w-full pt-4">
          <Button 
            onClick={() => router.push("/custom-agent")} 
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform duration-200"
          >
            <IconArrowLeft className="w-4 h-4" />
            Back to Custom Agents
          </Button>
        </div>
      </div>
    </div>
  );
}
