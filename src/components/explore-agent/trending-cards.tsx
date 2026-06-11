"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CountUp from "@/components/ui/countup";
import { Typography } from "@/components/ui/typography";
import { TrendingUp, Users } from "lucide-react";

interface TrendingAgent {
  id: number;
  name: string;
  roi: number;
  users: number;
  tvl: number;
  avatar: string;
  color: string;
}

interface TrendingCardsProps {
  agents: TrendingAgent[];
}

export const TrendingCards = ({ agents }: TrendingCardsProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {agents.map((agent) => (
        <Card
          key={agent.id}
          className="min-w-[200px] p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div
            className={`w-full h-20 rounded-lg bg-gradient-to-r ${agent.color} mb-3 flex items-center justify-center`}
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback className="text-lg">🤖</AvatarFallback>
            </Avatar>
          </div>
          <Typography
            variant="small"
            weight="semibold"
            className="mb-1 line-clamp-1"
          >
            {agent.name}
          </Typography>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <CountUp
              value={agent.roi}
              suffix="%"
              className="text-green-500 text-sm font-medium"
              duration={1.5}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <CountUp
                value={agent.users}
                suffix="K"
                className="text-xs"
                duration={1.5}
              />
            </div>
            <CountUp
              value={agent.tvl}
              prefix="$"
              suffix="M"
              className="text-xs"
              duration={1.5}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
