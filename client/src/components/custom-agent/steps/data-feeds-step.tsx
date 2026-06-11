"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { StepProps, DataSourceOption } from "../types";
import {
  Database,
  Globe,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const dataSourceOptions: DataSourceOption[] = [
  {
    id: "on-chain",
    name: "On-Chain Data",
    description: "Real-time blockchain data, prices, liquidity",
    icon: "🔗",
    status: "online",
  },
  {
    id: "off-chain",
    name: "Off-Chain Data",
    description: "Twitter sentiment, news, market analysis",
    icon: "📰",
    status: "online",
  },
  {
    id: "custom-api",
    name: "Custom API",
    description: "Your own data source or third-party API",
    icon: "⚙️",
    status: "pending",
  },
];

const intelligenceLevels = [
  {
    value: "basic",
    label: "Basic",
    description: "Rule-based decisions",
    features: ["Price alerts", "Simple indicators", "Basic patterns"],
    cost: "Free",
  },
  {
    value: "smart",
    label: "Smart",
    description: "Machine learning predictions",
    features: ["ML models", "Pattern recognition", "Sentiment analysis"],
    cost: "0.1% per trade",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Advanced AI with multiple data sources",
    features: [
      "Deep learning",
      "Multi-source analysis",
      "Real-time adaptation",
    ],
    cost: "0.3% per trade",
  },
];

export function DataFeedsStep({ data, onChange, errors }: StepProps) {
  const toggleDataSource = (sourceId: string) => {
    const updatedSources = data.dataSources.includes(sourceId as any)
      ? data.dataSources.filter((s) => s !== sourceId)
      : [...data.dataSources, sourceId as any];
    onChange({ dataSources: updatedSources });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "offline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      {/* Data Sources */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Database className="h-5 w-5 text-primary" />
            </div>
            Data Sources
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Select data sources to provide real-time market intelligence for
            your agent
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dataSourceOptions.map((source) => (
              <div
                key={source.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent/50 ${
                  data.dataSources.includes(source.id as any)
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() => toggleDataSource(source.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{source.icon}</span>
                    <div>
                      <h3 className="text-base font-semibold">{source.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {source.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(source.status)}
                    <Badge className={getStatusColor(source.status)}>
                      {source.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {source.id === "on-chain" && "Live blockchain data"}
                    {source.id === "off-chain" && "Social & news sentiment"}
                    {source.id === "custom-api" && "Custom integration"}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      data.dataSources.includes(source.id as any)
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
          {errors.dataSources && (
            <p className="text-sm text-destructive mt-2">
              {errors.dataSources}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Custom API Configuration */}
      {data.dataSources.includes("custom-api") && (
        <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Custom API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url" className="text-sm font-medium">
                  API Endpoint URL
                </Label>
                <Input
                  id="api-url"
                  placeholder="https://api.example.com/data"
                  value={data.customApiUrl}
                  onChange={(e) => onChange({ customApiUrl: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the URL for your custom data source API
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Test Connection
                </Button>
                <Button variant="outline" size="sm">
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Intelligence Level */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            AI Intelligence Level
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Choose the AI processing level that matches your trading complexity
            and budget
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              {intelligenceLevels.map((level) => (
                <div
                  key={level.value}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent/50 ${
                    data.intelligenceLevel === level.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onClick={() =>
                    onChange({ intelligenceLevel: level.value as any })
                  }
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold">{level.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {level.description}
                      </p>
                    </div>
                    <Badge variant="outline">{level.cost}</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Features:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {level.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance vs Cost Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Performance vs Cost
                </Label>
                <span className="text-sm text-muted-foreground">
                  {data.intelligenceLevel === "basic" && "Basic Performance"}
                  {data.intelligenceLevel === "smart" && "Balanced"}
                  {data.intelligenceLevel === "advanced" &&
                    "Maximum Performance"}
                </span>
              </div>
              <div className="px-4">
                <Slider
                  value={[
                    data.intelligenceLevel === "basic"
                      ? 0
                      : data.intelligenceLevel === "smart"
                      ? 50
                      : 100,
                  ]}
                  onValueChange={([value]) => {
                    const level =
                      value < 25 ? "basic" : value < 75 ? "smart" : "advanced";
                    onChange({ intelligenceLevel: level as any });
                  }}
                  max={100}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Low Cost</span>
                  <span>High Performance</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Status */}
      <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            Data Quality Status
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Monitor the health and availability of your configured data sources
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-green-900 dark:text-green-100">
                On-Chain Data
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Live & Verified
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-green-900 dark:text-green-100">
                Sentiment Data
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Real-time Updates
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-yellow-900 dark:text-yellow-100">
                Custom API
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {data.customApiUrl ? "Configured" : "Not Configured"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
