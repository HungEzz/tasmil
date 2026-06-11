"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button-v2";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CountUp from "@/components/ui/countup";
import { Typography } from "@/components/ui/typography";
import {
  TrendingUp,
  Star,
  Play,
  GitFork,
  Heart,
  Shield,
  Settings,
  Zap,
  BarChart3,
  DollarSign,
} from "lucide-react";

interface Agent {
  id: number;
  name: string;
  creator: string;
  description: string;
  tags: string[];
  roi: number;
  winRate: number;
  tvl: number;
  rating: number;
  riskLevel: string;
  autonomy: string;
  avatar: string;
  color: string;
  rules: string[];
  performance: {
    monthly: number;
    sharpe: number;
    maxDrawdown: number;
  };
  popularity: number;
  createdAt: Date;
}

interface AgentCardProps {
  agent: Agent;
  viewMode: "grid" | "list";
}

export const AgentCard = ({ agent, viewMode }: AgentCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getAutonomyColor = (autonomy: string) => {
    switch (autonomy.toLowerCase()) {
      case "manual":
        return "text-blue-500";
      case "semi-auto":
        return "text-orange-500";
      case "full-auto":
        return "text-purple-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card
      className={`p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group relative ${
        viewMode === "grid"
          ? "h-[400px] flex flex-col"
          : "h-[220px] flex flex-row items-center gap-6"
      }`}
    >
      {/* Top Bar - Risk/Autonomy Left, Share/Heart Right */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        {/* Risk and Autonomy - Left */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <Typography
              variant="small"
              className={`text-xs ${getRiskColor(agent.riskLevel)}`}
            >
              Risk: <span className="font-medium">{agent.riskLevel}</span>
            </Typography>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <Typography
              variant="small"
              className={`text-xs ${getAutonomyColor(agent.autonomy)}`}
            >
              {agent.autonomy}
            </Typography>
          </div>
        </div>

        {/* Share and Heart buttons - Right */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <GitFork className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Agent Header */}
      <div
        className={`flex items-center justify-between ${
          viewMode === "grid" ? "mb-1 mt-8" : "mb-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback
              className={`bg-gradient-to-r ${agent.color} text-embossed`}
            >
              🤖
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <Typography variant="h3" weight="bold" className={`line-clamp-1`}>
              {agent.name}
            </Typography>
            <Typography
              variant="small"
              className="text-muted-foreground text-sm"
            >
              by {agent.creator}
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <CountUp
            value={agent.rating}
            decimals={1}
            className="text-sm font-medium"
            duration={1.5}
          />
        </div>
      </div>

      {/* Description */}
      <Typography
        variant="small"
        className={`text-muted-foreground text-sm ${
          viewMode === "grid" ? "mb-4 line-clamp-2" : "mb-0 line-clamp-1 flex-1"
        }`}
      >
        {agent.description}
      </Typography>

      {/* Tags */}
      <div
        className={`flex flex-wrap gap-2 ${
          viewMode === "grid" ? "mb-4" : "mb-0"
        }`}
      >
        {agent.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>

      {/* Enhanced Metrics */}
      <div
        className={`grid gap-4 ${
          viewMode === "grid" ? "grid-cols-2 mb-4" : "grid-cols-3 mb-0"
        }`}
      >
        <div className="flex items-center justify-start gap-1">
          <TrendingUp className="h-3 w-3 text-green-500" />
          <CountUp
            value={agent.roi}
            suffix="%"
            className="text-green-500 text-sm font-semibold"
            duration={1.5}
          />
          <Typography
            variant="small"
            className="text-muted-foreground text-xs ml-1"
          >
            7d ROI
          </Typography>
        </div>
        <div className="flex items-center justify-start gap-1">
          <CountUp
            value={agent.winRate}
            suffix="%"
            className="text-sm font-semibold"
            duration={1.5}
          />
          <Typography
            variant="small"
            className="text-muted-foreground text-xs ml-1"
          >
            Win Rate
          </Typography>
        </div>
        <div className="flex items-center justify-start gap-1">
          <CountUp
            value={agent.tvl}
            prefix="$"
            suffix="M"
            className="text-sm font-semibold"
            duration={1.5}
          />
          <Typography
            variant="small"
            className="text-muted-foreground text-xs ml-1"
          >
            TVL
          </Typography>
        </div>
        <div className="flex items-center justify-start gap-1">
          <BarChart3 className="h-3 w-3 text-blue-500" />
          <CountUp
            value={agent.performance.monthly}
            suffix="%"
            className="text-blue-500 text-sm font-semibold"
            duration={1.5}
          />
          <Typography
            variant="small"
            className="text-muted-foreground text-xs ml-1"
          >
            30d ROI
          </Typography>
        </div>
        <div className="flex items-center justify-start gap-1">
          <DollarSign className="h-3 w-3 text-purple-500" />
          <CountUp
            value={agent.performance.sharpe}
            decimals={1}
            className="text-purple-500 text-sm font-semibold"
            duration={1.5}
          />
          <Typography
            variant="small"
            className="text-muted-foreground text-xs ml-1"
          >
            Sharpe
          </Typography>
        </div>
        {viewMode === "list" && (
          <div className="flex items-center justify-start gap-1">
            <Settings className="h-3 w-3 text-muted-foreground" />
            <Typography
              variant="small"
              className={`text-xs ${getAutonomyColor(agent.autonomy)}`}
            >
              {agent.autonomy}
            </Typography>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className={`flex gap-2 ${viewMode === "grid" ? "mt-auto" : "mt-0"}`}>
        <Button variant="outline" size="sm" className="flex-1">
          <Play className="h-4 w-4 mr-2" />
          Simulate
        </Button>
        <Button variant="gradient" size="sm" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Subscribe
        </Button>
      </div>
    </Card>
  );
};
