"use client";

import { CustomStepper } from "@/components/custom-agent/custom-stepper";

export default function CustomAgentPage() {
  const handlePublish = (data: any) => {
    console.log("Publishing agent:", data);
    // Handle publish logic here
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <CustomStepper onPublish={handlePublish} />
      </div>
    </div>
  );
}
