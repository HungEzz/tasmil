"use client";

import { CustomStepper } from "@/components/custom-agent/custom-stepper";

export default function CustomAgentPage() {
  const handlePublish = (data: any) => {
    console.log("Publishing agent:", data);
    // Handle publish logic here
  };

  return (
    <div className="flex-1 overflow-y-auto w-full p-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <CustomStepper onPublish={handlePublish} />
      </div>
    </div>
  );
}
