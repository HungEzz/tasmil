"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StepProps, StrategyOption } from "../types";
import {
  TrendingUp,
  BarChart3,
  Coins,
  RotateCcw,
  Plus,
  X,
  LineChart,
  Zap,
  Target,
} from "lucide-react";

const strategyOptions: StrategyOption[] = [
  {
    id: "momentum",
    name: "Momentum Based",
    description: "Uses RSI and MACD indicators for trend following",
    icon: TrendingUp,
    risk: "medium",
  },
  {
    id: "price-action",
    name: "Price Action",
    description: "Trades based on support/resistance levels",
    icon: BarChart3,
    risk: "high",
  },
  {
    id: "yield-farming",
    name: "Yield Farming",
    description: "Optimizes APY across different protocols",
    icon: Zap,
    risk: "low",
  },
  {
    id: "rebalancing",
    name: "Rebalancing",
    description: "Maintains target portfolio allocation",
    icon: Target,
    risk: "low",
  },
];

const timeframeOptions = [
  { value: "1m", label: "1 Minute", description: "High frequency trading" },
  { value: "5m", label: "5 Minutes", description: "Short-term analysis" },
  { value: "1h", label: "1 Hour", description: "Medium-term trends" },
  { value: "1d", label: "1 Day", description: "Long-term positions" },
];

const defaultRules = [
  "Max trade size: $500",
  "Slippage limit: 1%",
  "Stop loss: 5%",
  "Take profit: 10%",
];

export function StrategyStep({ data, onChange, errors }: StepProps) {
  const [newRule, setNewRule] = React.useState("");

  const addRule = () => {
    if (newRule.trim() && !data.rules.includes(newRule.trim())) {
      onChange({ rules: [...data.rules, newRule.trim()] });
      setNewRule("");
    }
  };

  const removeRule = (index: number) => {
    const updatedRules = data.rules.filter((_, i) => i !== index);
    onChange({ rules: updatedRules });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      {/* Strategy Type Selection */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            Strategy Type
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Select the core trading methodology that aligns with your market
            approach
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategyOptions.map((strategy) => {
              const Icon = strategy.icon;
              return (
                <div
                  key={strategy.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent/50 ${
                    data.strategyType === strategy.id
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onClick={() => onChange({ strategyType: strategy.id as any })}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">
                          {strategy.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {strategy.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={getRiskColor(strategy.risk)}>
                      {strategy.risk}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.strategyType && (
            <p className="text-sm text-destructive mt-2">
              {errors.strategyType}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timeframe Selection */}
        <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              Timeframe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={data.timeframe}
              onValueChange={(value) => onChange({ timeframe: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Advanced Rules Toggle */}
        <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <div className="p-2 bg-primary/10 rounded-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              Advanced Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="advanced-rules" className="text-sm font-medium">
                  Enable Advanced Rules
                </Label>
                <p className="text-sm text-muted-foreground">
                  Add custom stop-loss, take-profit, and risk management
                </p>
              </div>
              <Switch
                id="advanced-rules"
                checked={data.advancedRules}
                onCheckedChange={(checked) =>
                  onChange({ advancedRules: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Rules */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            Trading Rules
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Configure specific trading parameters and risk management rules
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Default Rules */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Default Rules</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {defaultRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                >
                  <span className="text-sm">{rule}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (!data.rules.includes(rule)) {
                        onChange({ rules: [...data.rules, rule] });
                      }
                    }}
                    disabled={data.rules.includes(rule)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Rules */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Custom Rules</Label>
            <div className="space-y-2">
              {data.rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-accent rounded-md"
                >
                  <span className="text-sm">{rule}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRule(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Rule */}
          <div className="flex gap-2">
            <Input
              placeholder="Add custom rule (e.g., Max position size: 10%)"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addRule()}
            />
            <Button onClick={addRule} disabled={!newRule.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Preview */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <LineChart className="h-5 w-5 text-primary" />
            </div>
            Strategy Preview
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Visualize your strategy performance with real-time market data
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Chart preview will appear here based on selected strategy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
