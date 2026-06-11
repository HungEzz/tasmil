export interface AgentFormData {
  // Basics
  name: string;
  personality: "conservative" | "enthusiast" | "aggressive";
  description: string;
  avatar: string;
  
  // Strategy
  strategyType: "momentum" | "price-action" | "yield-farming" | "rebalancing";
  rules: string[];
  timeframe: "1m" | "5m" | "1h" | "1d";
  advancedRules: boolean;
  
  // Data Feeds
  dataSources: ("on-chain" | "off-chain" | "custom-api")[];
  intelligenceLevel: "basic" | "smart" | "advanced";
  customApiUrl: string;
  
  // Control
  autonomyLevel: "manual" | "semi-auto" | "full-auto";
  guardrails: string[];
  maxDrawdown: number;
  dailyLimit: number;
  pauseOnVolatility: boolean;
  
  // Review
  isPublic: boolean;
  fee: number;
  tags: string[];
}

export interface StepProps {
  data: AgentFormData;
  onChange: (data: Partial<AgentFormData>) => void;
  errors: Record<string, string>;
}

export interface ReviewStepProps {
  data: AgentFormData;
  onChange: (data: Partial<AgentFormData>) => void;
  onPublish: () => void;
}

export interface StrategyOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  risk: "low" | "medium" | "high";
}

export interface DataSourceOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "online" | "offline" | "pending";
}

export interface GuardrailOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}
