"use client";

import * as React from "react";
import { Button } from "@/components/ui/button-v2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewStepProps } from "../types";
import {
  CheckCircle,
  Play,
  Download,
  Share2,
  Tag,
  BarChart3,
  Settings,
  Bot,
  Shield,
  Star,
  Flame,
  TrendingUp,
  BarChart,
  Zap,
  Target,
  Hand,
  UserCircle,
  Bot as BotIcon,
  Clock,
  Brain,
} from "lucide-react";

const simulationData = {
  initialBalance: 10000,
  finalBalance: 11250,
  totalTrades: 45,
  winRate: 68,
  maxDrawdown: 3.2,
  sharpeRatio: 1.8,
  dailyReturns: [
    { day: 1, value: 10000 },
    { day: 2, value: 10150 },
    { day: 3, value: 10200 },
    { day: 4, value: 10350 },
    { day: 5, value: 10500 },
    { day: 6, value: 10750 },
    { day: 7, value: 11250 },
  ],
};

export function ReviewStep({ data, onChange, onPublish }: ReviewStepProps) {
  const [isSimulating, setIsSimulating] = React.useState(false);
  const [simulationComplete, setSimulationComplete] = React.useState(false);
  const [newTag, setNewTag] = React.useState("");

  const addTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      onChange({ tags: [...data.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({ tags: data.tags.filter((tag) => tag !== tagToRemove) });
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSimulationComplete(true);
    setIsSimulating(false);
  };

  const getPersonalityIcon = (personality: string) => {
    switch (personality) {
      case "conservative":
        return Shield;
      case "enthusiast":
        return Star;
      case "aggressive":
        return Flame;
      default:
        return BotIcon;
    }
  };

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case "momentum":
        return TrendingUp;
      case "price-action":
        return BarChart;
      case "yield-farming":
        return Zap;
      case "rebalancing":
        return Target;
      default:
        return Target;
    }
  };

  const getAutonomyIcon = (autonomy: string) => {
    switch (autonomy) {
      case "manual":
        return Hand;
      case "semi-auto":
        return UserCircle;
      case "full-auto":
        return BotIcon;
      default:
        return Settings;
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Summary */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                Agent Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Agent Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  {React.createElement(getPersonalityIcon(data.personality), {
                    className: "h-8 w-8 text-primary",
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {data.name || "Unnamed Agent"}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize mb-3">
                    {data.personality} • {data.strategyType.replace("-", " ")}
                  </p>
                  {data.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {data.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Agent Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {React.createElement(getStrategyIcon(data.strategyType), {
                      className: "h-4 w-4 text-primary",
                    })}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Strategy</p>
                    <p className="text-sm font-medium capitalize">
                      {data.strategyType.replace("-", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {React.createElement(getAutonomyIcon(data.autonomyLevel), {
                      className: "h-4 w-4 text-primary",
                    })}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Autonomy</p>
                    <p className="text-sm font-medium capitalize">
                      {data.autonomyLevel.replace("-", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Timeframe</p>
                    <p className="text-sm font-medium">{data.timeframe}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">AI Level</p>
                    <p className="text-sm font-medium capitalize">
                      {data.intelligenceLevel}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Details */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="strategy" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                  <TabsTrigger value="control">Control</TabsTrigger>
                  <TabsTrigger value="rules">Rules</TabsTrigger>
                </TabsList>

                <TabsContent value="strategy" className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Strategy Type:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {data.strategyType.replace("-", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Timeframe:
                      </span>
                      <span className="text-sm font-medium">
                        {data.timeframe}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Advanced Rules:
                      </span>
                      <Badge
                        variant={data.advancedRules ? "default" : "secondary"}
                      >
                        {data.advancedRules ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="data" className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Data Sources:
                      </span>
                      <div className="flex gap-1">
                        {data.dataSources.map((source) => (
                          <Badge
                            key={source}
                            variant="outline"
                            className="text-xs"
                          >
                            {source.replace("-", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        AI Level:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {data.intelligenceLevel}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="control" className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Autonomy:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {data.autonomyLevel.replace("-", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Max Drawdown:
                      </span>
                      <span className="text-sm font-medium">
                        {data.maxDrawdown}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Daily Limit:
                      </span>
                      <span className="text-sm font-medium">
                        ${data.dailyLimit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rules" className="space-y-3">
                  <div className="space-y-2">
                    {data.rules.length > 0 ? (
                      data.rules.map((rule, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          • {rule}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No custom rules
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Simulation & Publish */}
        <div className="space-y-6">
          {/* Simulation */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                Strategy Simulation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!simulationComplete ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Play className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    Test Your Strategy
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                    Run a 7-day simulation with $10,000 to see how your agent
                    performs
                  </p>
                  <Button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="w-full max-w-xs"
                    size="lg"
                  >
                    {isSimulating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Running Simulation...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Simulation
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        +
                        {(
                          ((simulationData.finalBalance -
                            simulationData.initialBalance) /
                            simulationData.initialBalance) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <div className="text-sm font-medium text-green-700 dark:text-green-300">
                        Total Return
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {simulationData.winRate}%
                      </div>
                      <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Win Rate
                      </div>
                    </div>
                  </div>

                  {/* Detailed Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">
                        Total Trades
                      </span>
                      <span className="text-sm font-semibold">
                        {simulationData.totalTrades}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">
                        Max Drawdown
                      </span>
                      <span className="text-sm font-semibold">
                        {simulationData.maxDrawdown}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">
                        Sharpe Ratio
                      </span>
                      <span className="text-sm font-semibold">
                        {simulationData.sharpeRatio}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSimulationComplete(false)}
                    >
                      Run Again
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Publish Settings */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Share2 className="h-5 w-5 text-primary" />
                </div>
                Publish Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Public Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Share2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <Label
                      htmlFor="public-agent"
                      className="text-sm font-semibold"
                    >
                      Make Public
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Share your agent in the marketplace
                    </p>
                  </div>
                </div>
                <Switch
                  id="public-agent"
                  checked={data.isPublic}
                  onCheckedChange={(checked) => onChange({ isPublic: checked })}
                />
              </div>

              {data.isPublic && (
                <div className="space-y-6 p-4 bg-muted/20 rounded-lg border border-border/50">
                  {/* Trading Fee */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="agent-fee"
                      className="text-sm font-semibold"
                    >
                      Trading Fee (%)
                    </Label>
                    <Input
                      id="agent-fee"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={data.fee}
                      onChange={(e) =>
                        onChange({ fee: parseFloat(e.target.value) || 0 })
                      }
                      className="max-w-32"
                    />
                    <p className="text-xs text-muted-foreground">
                      You earn this percentage from each trade made by users
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {data.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          #{tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive transition-colors"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tag (e.g., momentum, defi)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                        className="flex-1"
                      />
                      <Button
                        onClick={addTag}
                        disabled={!newTag.trim()}
                        size="sm"
                      >
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Publish Button */}
              <div className="pt-4 border-t border-border">
                <Button
                  onClick={onPublish}
                  variant="gradient"
                  size="lg"
                  className="w-full h-12 text-base font-semibold"
                >
                  <Bot className="h-5 w-5 mr-2" />
                  Publish Agent
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Your agent will be deployed on-chain and available for use
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
