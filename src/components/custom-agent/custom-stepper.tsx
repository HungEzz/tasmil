"use client";

import * as React from "react";
import { defineStepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { AgentFormData } from "./types";
import { BasicsStep } from "./steps/basics-step";
import { StrategyStep } from "./steps/strategy-step";
import { DataFeedsStep } from "./steps/data-feeds-step";
import { ControlStep } from "./steps/control-step";
import { ReviewStep } from "./steps/review-step";

const { Stepper } = defineStepper(
  {
    id: "basics",
    title: "Basics",
  },
  {
    id: "strategy",
    title: "Strategy",
  },
  {
    id: "data-feeds",
    title: "Data Feeds",
  },
  {
    id: "control",
    title: "Control",
  },
  {
    id: "review",
    title: "Review",
  }
);

interface CustomStepperProps {
  onPublish: (data: AgentFormData) => void;
}

export function CustomStepper({ onPublish }: CustomStepperProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [formData, setFormData] = React.useState<AgentFormData>({
    // Basics
    name: "",
    personality: "enthusiast",
    description: "",
    avatar: "",

    // Strategy
    strategyType: "momentum",
    rules: [],
    timeframe: "1h",
    advancedRules: false,

    // Data Feeds
    dataSources: [],
    intelligenceLevel: "basic",
    customApiUrl: "",

    // Control
    autonomyLevel: "manual",
    guardrails: [],
    maxDrawdown: 10,
    dailyLimit: 1000,
    pauseOnVolatility: false,

    // Review
    isPublic: false,
    fee: 0.5,
    tags: [],
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateStep = (stepId: string): boolean => {
    const newErrors: Record<string, string> = {};

    switch (stepId) {
      case "basics":
        if (!formData.name.trim()) newErrors.name = "Agent name is required";
        if (formData.name.length > 50)
          newErrors.name = "Name must be 50 characters or less";
        break;
      case "strategy":
        if (!formData.strategyType)
          newErrors.strategyType = "Please select a strategy type";
        break;
      case "data-feeds":
        if (formData.dataSources.length === 0)
          newErrors.dataSources = "Please select at least one data source";
        break;
      case "control":
        if (!formData.autonomyLevel)
          newErrors.autonomyLevel = "Please select an autonomy level";
        break;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (methods: any) => {
    if (validateStep(methods.current.id)) {
      methods.next();
    }
  };

  const handlePublish = () => {
    if (validateStep("review")) {
      onPublish(formData);
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 h-full overflow-y-auto">
      <Stepper.Provider
        className="space-y-6"
        // variant={isMobile ? "vertical" : "horizontal"}
        // labelOrientation={isMobile ? "horizontal" : "vertical"}
        // tracking={tr ue}
      >
        {({ methods }) => (
          <React.Fragment>
            <Stepper.Navigation>
              {methods.all.map((step) => (
                <Stepper.Step
                  key={step.id}
                  of={step.id}
                  onClick={() => methods.goTo(step.id)}
                  className={`flex flex-col justify-center items-center ${
                    isMobile ? "text-left items-start" : "text-center"
                  }`}
                >
                  <Stepper.Title
                    className={`text-base font-medium w-full mb-1 cursor-pointer hover:text-primary transition-colors ${
                      isMobile ? "!text-left" : "!text-center"
                    }`}
                  >
                    {getStepTitle(step.id)}
                  </Stepper.Title>
                  <Stepper.Description
                    className={`text-sm text-muted-foreground w-full cursor-pointer hover:text-primary transition-colors ${
                      isMobile ? "!text-left" : "!text-center"
                    }`}
                  >
                    {getStepDescription(step.id)}
                  </Stepper.Description>
                </Stepper.Step>
              ))}
            </Stepper.Navigation>

            {methods.switch({
              basics: () => (
                <Stepper.Panel className="space-y-6">
                  <BasicsStep
                    data={formData}
                    onChange={(data) =>
                      setFormData((prev) => ({ ...prev, ...data }))
                    }
                    errors={errors}
                  />
                </Stepper.Panel>
              ),
              strategy: () => (
                <Stepper.Panel className="space-y-6">
                  <StrategyStep
                    data={formData}
                    onChange={(data) =>
                      setFormData((prev) => ({ ...prev, ...data }))
                    }
                    errors={errors}
                  />
                </Stepper.Panel>
              ),
              "data-feeds": () => (
                <Stepper.Panel className="space-y-6">
                  <DataFeedsStep
                    data={formData}
                    onChange={(data) =>
                      setFormData((prev) => ({ ...prev, ...data }))
                    }
                    errors={errors}
                  />
                </Stepper.Panel>
              ),
              control: () => (
                <Stepper.Panel className="space-y-6">
                  <ControlStep
                    data={formData}
                    onChange={(data) =>
                      setFormData((prev) => ({ ...prev, ...data }))
                    }
                    errors={errors}
                  />
                </Stepper.Panel>
              ),
              review: () => (
                <Stepper.Panel className="space-y-6">
                  <ReviewStep
                    data={formData}
                    onChange={(data) =>
                      setFormData((prev) => ({ ...prev, ...data }))
                    }
                    onPublish={handlePublish}
                  />
                </Stepper.Panel>
              ),
            })}

            <Stepper.Controls>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={methods.prev}
                  disabled={methods.isFirst}
                >
                  Previous
                </Button>
                <div className="flex gap-3">
                  {methods.isLast ? (
                    <Button
                      variant="default"
                      onClick={handlePublish}
                      className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      Publish Agent
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleNext(methods)}
                      className="px-8"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </Stepper.Controls>
          </React.Fragment>
        )}
      </Stepper.Provider>
    </div>
  );
}

function getStepTitle(stepId: string): string {
  switch (stepId) {
    case "basics":
      return "Agent Basics";
    case "strategy":
      return "Trading Strategy";
    case "data-feeds":
      return "Data Sources";
    case "control":
      return "Safety Controls";
    case "review":
      return "Review & Publish";
    default:
      return "";
  }
}

function getStepDescription(stepId: string): string {
  switch (stepId) {
    case "basics":
      return "Set up your agent's basic information and personality";
    case "strategy":
      return "Choose trading strategy and configure rules";
    case "data-feeds":
      return "Configure data sources and AI intelligence level";
    case "control":
      return "Set autonomy level and safety guardrails";
    case "review":
      return "Review your agent configuration and publish";
    default:
      return "";
  }
}
