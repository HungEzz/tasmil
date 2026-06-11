"use client";

import { useEffect, useState } from "react";
import { useNavigation } from "@/context/nav-context";
import { Typography } from "@/components/ui/typography";
import { TrendingCards } from "@/components/explore-agent/trending-cards";
import { FilterSection } from "@/components/explore-agent/filter-section";
import { AgentCard } from "@/components/explore-agent/agent-card";
import { AgentPagination } from "@/components/explore-agent/agent-pagination";
import {
  TrendingSkeletonCards,
  AgentSkeletonCards,
} from "@/components/explore-agent/skeleton-cards";
import {
  agentsData,
  trendingAgents,
} from "@/components/explore-agent/agent-data";

const ExploreAgentPage = () => {
  const { setNavItems } = useNavigation();
  const [activeFilter, setActiveFilter] = useState("Momentum Based");
  const [sortBy, setSortBy] = useState("popularity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    setNavItems({
      title: "Explore Agents",
      description: "Discover and interact with AI-powered DeFi trading agents",
      icon: "/images/defi-agent.png",
    });
  }, [setNavItems]);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, sortBy, sortOrder]);

  // Sorting logic
  const sortedAgents = [...agentsData].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortBy) {
      case "popularity":
        aValue = a.popularity;
        bValue = b.popularity;
        break;
      case "roi":
        aValue = a.roi;
        bValue = b.roi;
        break;
      case "rating":
        aValue = a.rating;
        bValue = b.rating;
        break;
      case "tvl":
        aValue = a.tvl;
        bValue = b.tvl;
        break;
      case "created":
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
        break;
      default:
        return 0;
    }

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Filter logic
  const filteredAgents = sortedAgents.filter((agent) => {
    if (activeFilter === "Momentum Based") {
      return agent.tags.includes("Momentum");
    } else if (activeFilter === "Price Action Methods") {
      return agent.tags.includes("Price Action");
    } else if (activeFilter === "Yield Farming") {
      return agent.tags.includes("Yield");
    } else if (activeFilter === "Portfolio Rebalancer") {
      return agent.tags.includes("Rebalancing");
    } else if (activeFilter === "Sentiment Trader") {
      return agent.tags.includes("Sentiment");
    } else if (activeFilter === "Low-Risk Protector") {
      return agent.riskLevel === "Low";
    }
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAgents = filteredAgents.slice(startIndex, endIndex);

  return (
    <div className="w-full min-h-screen overflow-y-auto bg-gradient-to-br from-background via-background to-muted/5">
      <div className="p-6 mb-20 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          {/* Trending Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              <Typography variant="h2" weight="bold" className="text-2xl">
                Now Trending
              </Typography>
            </div>

            {isLoading ? (
              <TrendingSkeletonCards />
            ) : (
              <TrendingCards agents={trendingAgents} />
            )}
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-10">
          <FilterSection
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Main Agent Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              <div>
                <Typography
                  variant="h2"
                  weight="bold"
                  className="text-2xl mb-1"
                >
                  All Agents
                </Typography>
                <Typography variant="small" className="text-muted-foreground">
                  {isLoading
                    ? "Loading..."
                    : `${filteredAgents.length} agents available`}{" "}
                  • {viewMode === "grid" ? "Grid" : "List"} view
                </Typography>
              </div>
            </div>
          </div>

          {isLoading ? (
            <AgentSkeletonCards viewMode={viewMode} />
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {paginatedAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && (
          <div className="flex justify-center">
            <AgentPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAgents.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreAgentPage;
