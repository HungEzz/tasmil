export interface Agent {
  id: number;
  name: string;
  creator: string;
  description: string;
  tags: string[];
  roi: number;
  winRate: number;
  tvl: number;
  rating: number;
  riskLevel: "Low" | "Medium" | "High";
  autonomy: "Manual" | "Semi-Auto" | "Full-Auto";
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
  strategy: string;
  supportedChains: string[];
  minInvestment: number;
  maxInvestment: number;
  fees: {
    management: number;
    performance: number;
  };
}

export interface TrendingAgent {
  id: number;
  name: string;
  roi: number;
  users: number;
  tvl: number;
  avatar: string;
  color: string;
}

export const trendingAgents: TrendingAgent[] = [
  {
    id: 1,
    name: "Momentum Yield Chaser",
    roi: 12.5,
    users: 1200,
    tvl: 50000000,
    avatar: "/images/defi-agent.png",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "DeFi Rebalancer Pro",
    roi: 8.3,
    users: 890,
    tvl: 32000000,
    avatar: "/images/defi-agent.png",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    name: "Yield Farmer Optimizer",
    roi: 15.7,
    users: 2100,
    tvl: 78000000,
    avatar: "/images/defi-agent.png",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 4,
    name: "Risk Guardian Shield",
    roi: 5.2,
    users: 650,
    tvl: 25000000,
    avatar: "/images/defi-agent.png",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    name: "Arbitrage Hunter",
    roi: 18.9,
    users: 1800,
    tvl: 65000000,
    avatar: "/images/defi-agent.png",
    color: "from-red-500 to-rose-500"
  }
];

export const agentsData: Agent[] = [
  {
    id: 1,
    name: "Momentum DeFi Hunter",
    creator: "@crypto_trader",
    description: "Advanced momentum trading bot that tracks RSI >70 to sell, integrates Twitter sentiment for market timing, and uses machine learning for pattern recognition.",
    tags: ["Momentum", "Ethereum", "Semi-Auto", "ML"],
    roi: 15.2,
    winRate: 78,
    tvl: 2100000,
    rating: 4.8,
    riskLevel: "Medium",
    autonomy: "Semi-Auto",
    avatar: "/images/defi-agent.png",
    color: "from-blue-500 to-cyan-500",
    rules: ["Max trade $500", "Slippage <1%", "Stop loss 5%", "RSI threshold 70"],
    performance: {
      monthly: 12.3,
      sharpe: 1.8,
      maxDrawdown: -3.2
    },
    popularity: 1200,
    createdAt: new Date('2024-01-15'),
    strategy: "Momentum-based trading with sentiment analysis",
    supportedChains: ["Ethereum", "Polygon"],
    minInvestment: 100,
    maxInvestment: 10000,
    fees: {
      management: 0.5,
      performance: 10
    }
  },
  {
    id: 2,
    name: "Yield Farming Optimizer",
    creator: "@defi_master",
    description: "Automatically finds and executes the best yield opportunities across multiple protocols, with real-time APY monitoring and auto-compounding features.",
    tags: ["Yield", "Multi-chain", "Full-Auto", "Compound"],
    roi: 22.1,
    winRate: 85,
    tvl: 5300000,
    rating: 4.9,
    riskLevel: "High",
    autonomy: "Full-Auto",
    avatar: "/images/defi-agent.png",
    color: "from-green-500 to-emerald-500",
    rules: ["Max 20% per protocol", "Min APY 8%", "Auto-compound", "Risk assessment"],
    performance: {
      monthly: 18.7,
      sharpe: 2.1,
      maxDrawdown: -8.5
    },
    popularity: 2100,
    createdAt: new Date('2024-01-10'),
    strategy: "Multi-protocol yield optimization",
    supportedChains: ["Ethereum", "Polygon", "Arbitrum", "Optimism"],
    minInvestment: 500,
    maxInvestment: 50000,
    fees: {
      management: 1.0,
      performance: 15
    }
  },
  {
    id: 3,
    name: "Portfolio Rebalancer",
    creator: "@quant_trader",
    description: "Maintains optimal asset allocation using mean reversion strategies, with dynamic rebalancing based on market volatility and correlation analysis.",
    tags: ["Rebalancing", "Ethereum", "Manual", "Quant"],
    roi: 9.8,
    winRate: 72,
    tvl: 1800000,
    rating: 4.6,
    riskLevel: "Low",
    autonomy: "Manual",
    avatar: "/images/defi-agent.png",
    color: "from-purple-500 to-pink-500",
    rules: ["Rebalance weekly", "Max deviation 5%", "DCA on dips", "Correlation check"],
    performance: {
      monthly: 7.2,
      sharpe: 1.5,
      maxDrawdown: -2.1
    },
    popularity: 850,
    createdAt: new Date('2024-01-20'),
    strategy: "Mean reversion with volatility targeting",
    supportedChains: ["Ethereum", "Polygon"],
    minInvestment: 200,
    maxInvestment: 20000,
    fees: {
      management: 0.3,
      performance: 5
    }
  },
  {
    id: 4,
    name: "Sentiment Trader Pro",
    creator: "@social_trader",
    description: "Uses advanced NLP to analyze Twitter, Reddit, and Telegram sentiment, combined with on-chain metrics to predict market movements and execute trades.",
    tags: ["Sentiment", "Multi-chain", "Semi-Auto", "NLP"],
    roi: 13.7,
    winRate: 69,
    tvl: 3200000,
    rating: 4.4,
    riskLevel: "Medium",
    autonomy: "Semi-Auto",
    avatar: "/images/defi-agent.png",
    color: "from-orange-500 to-red-500",
    rules: ["Min sentiment 0.7", "Max position 10%", "Stop on FUD", "Social verification"],
    performance: {
      monthly: 11.5,
      sharpe: 1.6,
      maxDrawdown: -4.8
    },
    popularity: 1500,
    createdAt: new Date('2024-01-12'),
    strategy: "Social sentiment + on-chain analysis",
    supportedChains: ["Ethereum", "Polygon", "BSC"],
    minInvestment: 300,
    maxInvestment: 15000,
    fees: {
      management: 0.8,
      performance: 12
    }
  },
  {
    id: 5,
    name: "Arbitrage Bot Elite",
    creator: "@arbitrage_pro",
    description: "Finds and executes cross-DEX arbitrage opportunities automatically with MEV protection, gas optimization, and real-time opportunity detection.",
    tags: ["Arbitrage", "Multi-DEX", "Full-Auto", "MEV"],
    roi: 28.4,
    winRate: 91,
    tvl: 4700000,
    rating: 4.9,
    riskLevel: "High",
    autonomy: "Full-Auto",
    avatar: "/images/defi-agent.png",
    color: "from-cyan-500 to-blue-500",
    rules: ["Min profit 0.5%", "Max gas 0.1 ETH", "MEV protection", "Slippage control"],
    performance: {
      monthly: 24.1,
      sharpe: 2.8,
      maxDrawdown: -6.2
    },
    popularity: 3200,
    createdAt: new Date('2024-01-05'),
    strategy: "Cross-DEX arbitrage with MEV protection",
    supportedChains: ["Ethereum", "Polygon", "Arbitrum"],
    minInvestment: 1000,
    maxInvestment: 100000,
    fees: {
      management: 2.0,
      performance: 20
    }
  },
  {
    id: 6,
    name: "Risk Guardian Shield",
    creator: "@safety_first",
    description: "Advanced risk management system that protects portfolios with dynamic stop-losses, position sizing, and emergency protocols for market crashes.",
    tags: ["Risk Management", "Ethereum", "Semi-Auto", "Protection"],
    roi: 6.3,
    winRate: 94,
    tvl: 1500000,
    rating: 4.7,
    riskLevel: "Low",
    autonomy: "Semi-Auto",
    avatar: "/images/defi-agent.png",
    color: "from-gray-500 to-slate-500",
    rules: ["Max loss 2%", "Position size 5%", "Emergency stop", "Volatility check"],
    performance: {
      monthly: 4.8,
      sharpe: 1.2,
      maxDrawdown: -1.5
    },
    popularity: 950,
    createdAt: new Date('2024-01-18'),
    strategy: "Dynamic risk management and protection",
    supportedChains: ["Ethereum", "Polygon"],
    minInvestment: 100,
    maxInvestment: 5000,
    fees: {
      management: 0.2,
      performance: 3
    }
  },
  {
    id: 7,
    name: "Liquidity Provider Pro",
    creator: "@liquidity_expert",
    description: "Automated liquidity provision across Uniswap V3, SushiSwap, and PancakeSwap with dynamic fee tier selection and impermanent loss protection.",
    tags: ["Liquidity", "Multi-DEX", "Full-Auto", "LP"],
    roi: 11.2,
    winRate: 82,
    tvl: 3800000,
    rating: 4.5,
    riskLevel: "Medium",
    autonomy: "Full-Auto",
    avatar: "/images/defi-agent.png",
    color: "from-indigo-500 to-purple-500",
    rules: ["Fee tier optimization", "IL protection", "Auto-compound", "Range management"],
    performance: {
      monthly: 9.8,
      sharpe: 1.9,
      maxDrawdown: -3.8
    },
    popularity: 1800,
    createdAt: new Date('2024-01-08'),
    strategy: "Dynamic liquidity provision with IL protection",
    supportedChains: ["Ethereum", "Polygon", "BSC"],
    minInvestment: 500,
    maxInvestment: 30000,
    fees: {
      management: 1.2,
      performance: 8
    }
  },
  {
    id: 8,
    name: "Flash Loan Arbitrage",
    creator: "@flash_trader",
    description: "Executes complex flash loan arbitrage strategies across multiple protocols, with gas optimization and profit maximization algorithms.",
    tags: ["Flash Loan", "Arbitrage", "Full-Auto", "Advanced"],
    roi: 35.7,
    winRate: 88,
    tvl: 6200000,
    rating: 4.9,
    riskLevel: "High",
    autonomy: "Full-Auto",
    avatar: "/images/defi-agent.png",
    color: "from-pink-500 to-rose-500",
    rules: ["Min profit 1%", "Gas optimization", "Flash loan limits", "Risk assessment"],
    performance: {
      monthly: 29.3,
      sharpe: 3.2,
      maxDrawdown: -7.1
    },
    popularity: 2800,
    createdAt: new Date('2024-01-03'),
    strategy: "Flash loan arbitrage with gas optimization",
    supportedChains: ["Ethereum", "Polygon", "Arbitrum"],
    minInvestment: 2000,
    maxInvestment: 200000,
    fees: {
      management: 3.0,
      performance: 25
    }
  }
];
