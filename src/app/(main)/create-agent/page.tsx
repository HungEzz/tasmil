"use client";

import { useEffect } from "react";
import { useNavigation } from "@/context/nav-context";
import { CustomStepper } from "@/components/custom-agent/custom-stepper";
import { AgentFormData } from "@/components/custom-agent/types";
import { useToast } from "@/hooks/use-toast";

const CreateAgentPage = () => {
  const { setNavItems } = useNavigation();
  const { toast } = useToast();

  useEffect(() => {
    setNavItems({
      title: "Create Your Agent",
      icon: "/images/portfolio.png",
      description: "Build an AI-powered DeFi agent in 5 simple steps",
    });
  }, [setNavItems]);

  const handlePublish = (data: AgentFormData) => {
    // Publish logic here
    console.log("Publishing agent:", data);
    toast({
      title: "Agent Published",
      description:
        "Your trading agent has been successfully published to the marketplace!",
    });
  };

  return <CustomStepper onPublish={handlePublish} />;
};

export default CreateAgentPage;
