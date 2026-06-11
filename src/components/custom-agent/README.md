# Custom Agent Creation Component

A comprehensive wizard-style interface for creating AI-powered DeFi trading agents on the Tasmil platform.

## Overview

This component provides a 5-step process for users to create, configure, and publish trading agents without any coding knowledge. The interface follows a clean, modern design with a stepper navigation on the left and content area on the right.

## Features

### 🎯 **Step 1: Basics**

- Agent name with auto-suggestions
- Personality selection (Conservative, Enthusiast, Aggressive)
- Description and avatar upload/generation
- Real-time validation and character limits

### 📈 **Step 2: Strategy**

- Strategy type selection (Momentum, Price Action, Yield Farming, Rebalancing)
- Timeframe configuration (1m, 5m, 1h, 1d)
- Custom trading rules with templates
- Advanced rules toggle
- Strategy preview visualization

### 🔗 **Step 3: Data Feeds**

- Multiple data source selection (On-chain, Off-chain, Custom API)
- AI intelligence level configuration (Basic, Smart, Advanced)
- Real-time data quality status indicators
- Custom API integration setup
- Performance vs cost optimization

### ⚙️ **Step 4: Control**

- Autonomy level selection (Manual, Semi-auto, Full-auto)
- Safety guardrails configuration
- Risk parameter adjustment (max drawdown, daily limits)
- Wallet integration for on-chain deployment
- Security warnings for high-risk configurations

### 📊 **Step 5: Review & Publish**

- Complete agent configuration summary
- 7-day simulation with $10,000 test portfolio
- Performance metrics and downloadable reports
- Public/private publishing options
- Fee structure and marketplace integration
- Tag system for discoverability

## Technical Implementation

### Component Structure

```
src/components/custom-agent/
├── agent-stepper.tsx          # Main stepper component
├── types.ts                   # TypeScript interfaces
├── steps/
│   ├── basics-step.tsx        # Step 1: Basic information
│   ├── strategy-step.tsx      # Step 2: Trading strategy
│   ├── data-feeds-step.tsx    # Step 3: Data sources
│   ├── control-step.tsx       # Step 4: Safety controls
│   └── review-step.tsx        # Step 5: Review & publish
└── README.md                  # This file
```

### Key Features

#### Form State Management

- Centralized state management with React hooks
- Real-time validation and error handling
- Draft saving functionality
- Step-by-step progress tracking

#### Validation System

- Field-level validation with error messages
- Step completion requirements
- Real-time feedback and suggestions
- Form submission prevention for incomplete steps

#### Responsive Design

- Mobile-first approach with responsive breakpoints
- Stepper collapses to accordion on mobile
- Touch-friendly interface elements
- Optimized for all screen sizes

#### Accessibility

- Full keyboard navigation support
- ARIA labels and descriptions
- Screen reader compatibility
- Focus management and visual indicators

## Usage

```tsx
import { AgentStepper } from "@/components/custom-agent/agent-stepper";
import { AgentFormData } from "@/components/custom-agent/types";

function CustomAgentPage() {
  const handleSaveDraft = (data: AgentFormData) => {
    // Save draft logic
    console.log("Saving draft:", data);
  };

  const handlePublish = (data: AgentFormData) => {
    // Publish logic
    console.log("Publishing agent:", data);
  };

  return (
    <AgentStepper onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
  );
}
```

## Data Flow

1. **Form Data**: Centralized `AgentFormData` interface manages all form state
2. **Validation**: Each step validates required fields before allowing progression
3. **State Updates**: `onChange` callbacks update parent state and clear errors
4. **Navigation**: Stepper component handles step transitions and validation
5. **Actions**: Save draft and publish actions are handled by parent components

## Styling

The component uses the existing Tasmil design system:

- Dark theme with navy backgrounds
- Blue gradient accents (#B5EAFF to #00BFFF)
- Consistent spacing and typography
- Smooth animations and transitions
- Card-based layout with subtle shadows

## Future Enhancements

- [ ] Real-time chart previews for strategies
- [ ] Advanced backtesting capabilities
- [ ] Template library for quick agent creation
- [ ] Collaboration features for team agents
- [ ] A/B testing for agent configurations
- [ ] Integration with external data providers
- [ ] Advanced risk management tools
- [ ] Performance analytics dashboard

## Dependencies

- React 18+ with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI primitives for accessibility
- Lucide React for icons
- Custom UI components from shadcn/ui

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lazy loading for step components
- Optimized re-renders with React.memo
- Efficient state management
- Minimal bundle size impact
- Fast navigation between steps
