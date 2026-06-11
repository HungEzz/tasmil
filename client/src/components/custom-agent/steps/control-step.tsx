"use client";

import * as React from "react";
import { Button } from "@/components/ui/button-v2";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { StepProps, GuardrailOption } from "../types";
import {
  Hand,
  UserCircle,
  Bot,
  Shield,
  AlertTriangle,
  Wallet,
  Settings,
} from "lucide-react";

const autonomyOptions = [
  {
    value: "manual",
    label: "Manual",
    description: "You approve every trade",
    icon: Hand,
    color: "text-blue-500",
    risk: "Lowest risk",
  },
  {
    value: "semi-auto",
    label: "Semi-Auto",
    description: "Agent suggests, you decide",
    icon: UserCircle,
    color: "text-yellow-500",
    risk: "Medium risk",
  },
  {
    value: "full-auto",
    label: "Full Auto",
    description: "Agent trades autonomously",
    icon: Bot,
    color: "text-red-500",
    risk: "Highest risk",
  },
];

const guardrailOptions: GuardrailOption[] = [
  {
    id: "max-drawdown",
    name: "Maximum Drawdown",
    description: "Stop trading if losses exceed limit",
    enabled: true,
  },
  {
    id: "daily-limit",
    name: "Daily Trading Limit",
    description: "Limit total trading volume per day",
    enabled: true,
  },
  {
    id: "pause-volatility",
    name: "Pause on High Volatility",
    description: "Stop trading during extreme market conditions",
    enabled: false,
  },
  {
    id: "position-size",
    name: "Position Size Limit",
    description: "Limit individual position sizes",
    enabled: true,
  },
  {
    id: "cooldown",
    name: "Trading Cooldown",
    description: "Wait period between trades",
    enabled: false,
  },
];

export function ControlStep({ data, onChange, errors }: StepProps) {
  const toggleGuardrail = (guardrailId: string) => {
    const updatedGuardrails = data.guardrails.includes(guardrailId)
      ? data.guardrails.filter((g) => g !== guardrailId)
      : [...data.guardrails, guardrailId];
    onChange({ guardrails: updatedGuardrails });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Lowest risk":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium risk":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Highest risk":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      {/* Autonomy Level */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            Autonomy Level
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Define the level of autonomous decision-making for your trading
            agent
          </p>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.autonomyLevel}
            onValueChange={(value) => onChange({ autonomyLevel: value as any })}
            className="space-y-4"
          >
            {autonomyOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.value}
                  className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent/50 ${
                    data.autonomyLevel === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onClick={() =>
                    onChange({ autonomyLevel: option.value as any })
                  }
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`h-5 w-5 ${option.color}`} />
                      <Label
                        htmlFor={option.value}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      <Badge className={getRiskColor(option.risk)}>
                        {option.risk}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
          {errors.autonomyLevel && (
            <p className="text-sm text-destructive mt-2">
              {errors.autonomyLevel}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Safety Guardrails */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            Safety Guardrails
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Implement protective measures to minimize risk and ensure
            responsible trading
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guardrailOptions.map((guardrail) => (
              <div
                key={guardrail.id}
                className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent/50 ${
                  data.guardrails.includes(guardrail.id)
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() => toggleGuardrail(guardrail.id)}
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-1 ${
                    data.guardrails.includes(guardrail.id)
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {data.guardrails.includes(guardrail.id) && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-sm" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{guardrail.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {guardrail.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Parameters */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            Risk Parameters
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Configure risk management parameters to protect your trading capital
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Maximum Drawdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Maximum Drawdown: {data.maxDrawdown}%
              </Label>
              <Badge variant="outline">
                {data.maxDrawdown < 10
                  ? "Conservative"
                  : data.maxDrawdown < 20
                  ? "Moderate"
                  : "Aggressive"}
              </Badge>
            </div>
            <Slider
              value={[data.maxDrawdown]}
              onValueChange={([value]) => onChange({ maxDrawdown: value })}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1% (Very Conservative)</span>
              <span>50% (Very Aggressive)</span>
            </div>
          </div>

          {/* Daily Trading Limit */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Daily Trading Limit: ${data.dailyLimit.toLocaleString()}
              </Label>
              <Badge variant="outline">
                {data.dailyLimit < 1000
                  ? "Low"
                  : data.dailyLimit < 10000
                  ? "Medium"
                  : "High"}
              </Badge>
            </div>
            <Slider
              value={[data.dailyLimit]}
              onValueChange={([value]) => onChange({ dailyLimit: value })}
              max={100000}
              min={100}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$100 (Minimal)</span>
              <span>$100,000 (Maximum)</span>
            </div>
          </div>

          {/* Pause on Volatility */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <Label htmlFor="pause-volatility" className="text-sm font-medium">
                Pause on High Volatility
              </Label>
              <p className="text-xs text-muted-foreground">
                Automatically pause trading during extreme market conditions
              </p>
            </div>
            <Switch
              id="pause-volatility"
              checked={data.pauseOnVolatility}
              onCheckedChange={(checked) =>
                onChange({ pauseOnVolatility: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Wallet Integration */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            Wallet Integration
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Connect your wallet to enable on-chain trading and agent deployment
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your wallet to enable on-chain trading and deployment
            </p>
            <div className="flex gap-3">
              <Button variant="gradient" className="flex-1">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
              <Button variant="outline">View Supported Wallets</Button>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    Security Notice
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Your wallet will only be used for approved transactions. You
                    can revoke access at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Auto Warning */}
      {data.autonomyLevel === "full-auto" && (
        <Card className="border-red-200 dark:border-red-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-200">
                  High Risk Warning
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Full autonomy mode allows your agent to trade without your
                  approval. Monitor your agent closely and ensure all guardrails
                  are properly configured. You are responsible for all trading
                  decisions made by your agent.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
