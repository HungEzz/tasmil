"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  SlidersHorizontal,
  TrendingUp,
  ArrowUpRight,
  Star,
  Users,
  Settings,
  BarChart3,
  Zap,
  Shield,
} from "lucide-react";

interface FilterSectionProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const filters = [
  { value: "Momentum Based", label: "Momentum Based", icon: TrendingUp },
  {
    value: "Price Action Methods",
    label: "Price Action Methods",
    icon: BarChart3,
  },
  { value: "Yield Farming", label: "Yield Farming", icon: Zap },
  {
    value: "Portfolio Rebalancer",
    label: "Portfolio Rebalancer",
    icon: Settings,
  },
  { value: "Sentiment Trader", label: "Sentiment Trader", icon: Users },
  { value: "Low-Risk Protector", label: "Low-Risk Protector", icon: Shield },
];

const sortOptions = [
  { value: "popularity", label: "Most Popular", icon: TrendingUp },
  { value: "roi", label: "Highest ROI", icon: ArrowUpRight },
  { value: "rating", label: "Top Rated", icon: Star },
  { value: "tvl", label: "Largest TVL", icon: Users },
  { value: "created", label: "Newest", icon: Settings },
];

export const FilterSection = ({
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  viewMode,
  onViewModeChange,
}: FilterSectionProps) => {
  const sortId = "sort-select";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left side - Filter Select */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Label
              htmlFor="filter-select"
              className="text-sm font-medium text-muted-foreground"
            >
              Filter by:
            </Label>
            <Select value={activeFilter} onValueChange={onFilterChange}>
              <SelectTrigger id="filter-select" className="w-48">
                <SelectValue placeholder="Select filter option" />
              </SelectTrigger>
              <SelectContent className="data-[state=open]:slide-in-from-bottom-8 data-[state=open]:zoom-in-100 duration-400">
                <SelectGroup>
                  <SelectLabel>Filter Options</SelectLabel>
                  {filters.map((filter) => {
                    const IconComponent = filter.icon;
                    return (
                      <SelectItem key={filter.value} value={filter.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{filter.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right side - Sort and View controls */}
        <div className="flex items-center gap-4">
          {/* Sort Select */}
          <div className="flex items-center gap-2">
            <Label
              htmlFor={sortId}
              className="text-sm font-medium text-muted-foreground"
            >
              Sort by:
            </Label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger id={sortId} className="w-48">
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent className="data-[state=open]:slide-in-from-bottom-8 data-[state=open]:zoom-in-100 duration-400">
                <SelectGroup>
                  <SelectLabel>Sort Options</SelectLabel>
                  {sortOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
            }
            className="hover:scale-105 transition-all duration-300"
            title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
