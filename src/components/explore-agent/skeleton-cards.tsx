"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const TrendingSkeletonCards = () => {
  return (
    <div className="flex gap-4 overflow-x-auto p-4 trending-scroll">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className="min-w-[200px] p-4">
          <Skeleton className="w-full h-20 rounded-lg mb-3" />
          <Skeleton className="h-4 w-3/4 mb-1" />
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-3 w-10" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export const AgentSkeletonCards = ({
  viewMode,
}: {
  viewMode: "grid" | "list";
}) => {
  const skeletonCount = viewMode === "grid" ? 8 : 4;

  return (
    <div
      className={`grid gap-6 mb-8 ${
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Card
          key={index}
          className={`p-6 relative ${
            viewMode === "grid"
              ? "h-[400px] flex flex-col"
              : "h-[220px] flex flex-row items-center gap-6"
          }`}
        >
          {/* Top Bar - Risk/Autonomy Left, Share/Heart Right */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            {/* Risk and Autonomy - Left */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            {/* Share and Heart buttons - Right */}
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>

          {/* Agent Header */}
          <div
            className={`flex items-start justify-between ${
              viewMode === "grid" ? "mb-4 mt-8" : "mb-0"
            }`}
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>

          {/* Description */}
          <div className={`${viewMode === "grid" ? "mb-4" : "mb-0 flex-1"}`}>
            <Skeleton
              className={`h-3 w-full ${viewMode === "grid" ? "mb-1" : ""}`}
            />
            {viewMode === "grid" && <Skeleton className="h-3 w-2/3" />}
          </div>

          {/* Tags */}
          <div
            className={`flex flex-wrap gap-2 ${
              viewMode === "grid" ? "mb-4" : "mb-0"
            }`}
          >
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-18 rounded-full" />
          </div>

          {/* Enhanced Metrics */}
          <div
            className={`grid gap-4 ${
              viewMode === "grid" ? "grid-cols-2 mb-4" : "grid-cols-3 mb-0"
            }`}
          >
            <div className="flex items-center justify-start gap-1">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-3 w-8 ml-1" />
            </div>
            <div className="flex items-center justify-start gap-1">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-3 w-12 ml-1" />
            </div>
            <div className="flex items-center justify-start gap-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-3 w-6 ml-1" />
            </div>
            {viewMode === "list" && (
              <div className="flex items-center justify-start gap-1">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            )}
          </div>

          {/* Additional Performance Metrics (Grid only) */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-start gap-1">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-3 w-10 ml-1" />
              </div>
              <div className="flex items-center justify-start gap-1">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-3 w-12 ml-1" />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div
            className={`flex gap-2 ${viewMode === "grid" ? "mt-auto" : "mt-0"}`}
          >
            <Skeleton className="h-8 flex-1 rounded-md" />
            <Skeleton className="h-8 flex-1 rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  );
};
