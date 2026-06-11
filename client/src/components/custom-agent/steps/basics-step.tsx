"use client";

import * as React from "react";
import { useActionState, useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StepProps } from "../types";
import {
  Shield,
  Star,
  Flame,
  Upload,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";

// Simple validation schema (replacing Zod for now)
const basicsSchema = {
  name: {
    min: 1,
    max: 50,
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
  },
  description: {
    max: 500,
  },
  personality: {
    options: ["conservative", "enthusiast", "aggressive"],
  },
  avatar: {
    pattern: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
  },
};

// Validation functions
const validateField = (field: string, value: string): string | null => {
  switch (field) {
    case "name":
      if (!value) return "Agent name is required";
      if (value.length < 3) return "Name must be at least 3 characters";
      if (value.length > 50) return "Name must be 50 characters or less";
      if (!basicsSchema.name.pattern.test(value))
        return "Name can only contain letters, numbers, spaces, hyphens, and underscores";
      return null;
    case "description":
      if (value && value.length > 500)
        return "Description must be 500 characters or less";
      return null;
    case "personality":
      if (!value) return "Please select a personality type";
      if (!basicsSchema.personality.options.includes(value as any))
        return "Invalid personality type";
      return null;
    case "avatar":
      if (value && !basicsSchema.avatar.pattern.test(value))
        return "Please provide a valid image URL";
      return null;
    default:
      return null;
  }
};

// Server Action for validation
async function validateBasicsStep(
  prevState: { success: boolean; data: any; errors: Record<string, string> },
  formData: FormData
) {
  try {
    const data = {
      name: formData.get("name") as string,
      personality: formData.get("personality") as string,
      description: formData.get("description") as string,
      avatar: formData.get("avatar") as string,
    };

    // Validate each field
    const errors: Record<string, string> = {};
    Object.entries(data).forEach(([field, value]) => {
      const error = validateField(field, value || "");
      if (error) {
        errors[field] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        data: null,
        errors,
      };
    }

    return {
      success: true,
      data,
      errors: {},
    };
  } catch {
    return {
      success: false,
      data: null,
      errors: { general: "An unexpected error occurred. Please try again." },
    };
  }
}

const personalityOptions = [
  {
    value: "conservative",
    label: "Conservative",
    description: "Low-risk trades with steady growth",
    icon: Shield,
    color: "text-green-500",
  },
  {
    value: "enthusiast",
    label: "Enthusiast",
    description: "Balances growth and safety",
    icon: Star,
    color: "text-blue-500",
  },
  {
    value: "aggressive",
    label: "Aggressive",
    description: "High-risk, high-reward strategies",
    icon: Flame,
    color: "text-red-500",
  },
] as const;

const nameSuggestions = [
  "MomentumBot2025",
  "DeFiTrader",
  "YieldHunter",
  "SmartSwap",
  "CryptoAlpha",
  "ArbitragePro",
  "LiquidityBot",
  "YieldMaximizer",
  "RiskManager",
  "TrendFollower",
] as const;

export function BasicsStep({ data, onChange, errors }: StepProps) {
  // Form state management with useActionState
  const [state, formAction, isPending] = useActionState(validateBasicsStep, {
    success: false,
    data: null,
    errors: {},
  });

  // Optimistic updates for better UX
  const [optimisticData, setOptimisticData] = useOptimistic(
    data,
    (currentData, newData: Partial<typeof data>) => ({
      ...currentData,
      ...newData,
    })
  );

  // Local state for UI interactions
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<
    string[]
  >([]);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {}
  );
  const [isValidating, setIsValidating] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Debounced validation with cleanup
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const validateFieldDebounced = React.useCallback(
    (field: string, value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        setIsValidating(true);
        try {
          const error = validateField(field, value);
          if (error) {
            setFieldErrors((prev) => ({
              ...prev,
              [field]: error,
            }));
          } else {
            setFieldErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[field];
              return newErrors;
            });
          }
        } finally {
          setIsValidating(false);
        }
      }, 300);
    },
    []
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleNameChange = (value: string) => {
    React.startTransition(() => {
      setOptimisticData({ name: value });
    });
    onChange({ name: value });
    validateFieldDebounced("name", value);

    if (value.length > 2) {
      const filtered = nameSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleDescriptionChange = (value: string) => {
    React.startTransition(() => {
      setOptimisticData({ description: value });
    });
    onChange({ description: value });
    validateFieldDebounced("description", value);
  };

  const handlePersonalityChange = (value: string) => {
    React.startTransition(() => {
      setOptimisticData({ personality: value as any });
    });
    onChange({ personality: value as any });
    validateFieldDebounced("personality", value);
  };

  const selectSuggestion = (suggestion: string) => {
    React.startTransition(() => {
      setOptimisticData({ name: suggestion });
    });
    onChange({ name: suggestion });
    setShowSuggestions(false);
    validateFieldDebounced("name", suggestion);
  };

  // Image upload handlers
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setFieldErrors((prev) => ({
        ...prev,
        avatar: "Please select a valid image file",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setFieldErrors((prev) => ({
        ...prev,
        avatar: "Image size must be less than 5MB",
      }));
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.avatar;
      return newErrors;
    });

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      // Convert to base64 for preview (in real app, upload to server)
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        React.startTransition(() => {
          setOptimisticData({ avatar: result });
        });
        onChange({ avatar: result });
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 500);
      };
      reader.readAsDataURL(file);
    } catch {
      setFieldErrors((prev) => ({
        ...prev,
        avatar: "Failed to upload image. Please try again.",
      }));
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeAvatar = () => {
    React.startTransition(() => {
      setOptimisticData({ avatar: "" });
    });
    onChange({ avatar: "" });
  };

  // Update field errors when server validation results change
  React.useEffect(() => {
    if (state.errors) {
      setFieldErrors(state.errors);
    }
  }, [state.errors]);

  // Get current errors (server or client)
  const currentErrors =
    Object.keys(fieldErrors).length > 0 ? fieldErrors : errors;

  return (
    <div className="space-y-8">
      {/* Server validation errors */}
      {state.errors && "general" in state.errors && state.errors.general && (
        <Alert
          variant="destructive"
          className="border-destructive/50 bg-destructive/10"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">
            {state.errors.general}
          </AlertDescription>
        </Alert>
      )}

      <form action={formAction} className="space-y-8">
        <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              Agent Identity
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Establish your agent&apos;s unique identity and core operational
              parameters
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Agent Name */}
            <div className="space-y-2">
              <Label htmlFor="agent-name" className="text-sm font-medium">
                Agent Name *
              </Label>
              <div className="relative">
                <Input
                  id="agent-name"
                  name="name"
                  placeholder="Fill your agent name..."
                  value={optimisticData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  maxLength={50}
                  className={`pr-20 ${
                    currentErrors.name
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  aria-invalid={!!currentErrors.name}
                  aria-describedby={
                    currentErrors.name ? "name-error" : undefined
                  }
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {isValidating && (
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                  )}
                  {!isValidating &&
                    !currentErrors.name &&
                    optimisticData.name && (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    )}
                  <span className="text-xs text-muted-foreground">
                    {optimisticData.name.length}/50
                  </span>
                </div>
              </div>
              {currentErrors.name && (
                <p
                  id="name-error"
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {currentErrors.name}
                </p>
              )}

              {/* Name Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground first:rounded-t-md last:rounded-b-md focus:outline-none focus:bg-accent"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Agent Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Briefly describe your agent's purpose and strategy..."
                value={optimisticData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                rows={3}
                className={`resize-none ${
                  currentErrors.description
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
                aria-invalid={!!currentErrors.description}
                aria-describedby={
                  currentErrors.description
                    ? "description-error"
                    : "description-help"
                }
              />
              <div className="flex justify-between items-start">
                <p
                  id="description-help"
                  className="text-xs text-muted-foreground"
                >
                  This will be shown to other users when your agent is published
                </p>
                <span className="text-xs text-muted-foreground">
                  {optimisticData.description?.length || 0}/500
                </span>
              </div>
              {currentErrors.description && (
                <p
                  id="description-error"
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {currentErrors.description}
                </p>
              )}
            </div>

            {/* Avatar Upload */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Agent Avatar</Label>
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar Preview */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden border-2 border-border/50 group">
                    {optimisticData.avatar ? (
                      <>
                        <Image
                          src={optimisticData.avatar}
                          alt="Agent avatar"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeAvatar}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {isUploading && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Area */}
                <div className="flex-1 space-y-4">
                  {/* Drag & Drop Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
                      dragActive
                        ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />

                    <div className="text-center space-y-3">
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {isUploading ? "Uploading..." : "Upload avatar"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Drag & drop or click to browse
                        </p>
                      </div>

                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {uploadProgress}% uploaded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isPending || isUploading}
                    className="w-full sm:w-auto"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? "Uploading..." : "Choose File"}
                  </Button>

                  {/* File Requirements */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Supported formats: JPG, PNG, GIF, WebP</p>
                    <p>• Maximum file size: 5MB</p>
                    <p>• Recommended size: 400x400px</p>
                  </div>
                </div>
              </div>

              {currentErrors.avatar && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {currentErrors.avatar}
                </p>
              )}

              <input
                type="hidden"
                name="avatar"
                value={optimisticData.avatar || ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Personality Selection */}
        <Card className="glass border-primary/20 dark:border-white/5 shadow-lg rounded-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              Trading Personality
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Define your agent&apos;s risk tolerance and trading behavioral
              patterns
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={optimisticData.personality}
              onValueChange={(value) => {
                handlePersonalityChange(value);
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              name="personality"
            >
              {personalityOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = optimisticData.personality === option.value;
                const hasError = currentErrors.personality;

                return (
                  <div
                    key={option.value}
                    className={`relative group cursor-pointer transition-all duration-200 w-full text-left ${
                      isSelected ? "scale-105" : "hover:scale-102"
                    }`}
                    onClick={() => handlePersonalityChange(option.value)}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePersonalityChange(option.value);
                      }
                    }}
                  >
                    <div
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10"
                          : hasError
                          ? "border-destructive bg-destructive/5"
                          : "border-border bg-card hover:border-primary/50 hover:bg-accent/30"
                      }`}
                    >
                      {/* Selection Indicator */}
                      <div className="absolute top-4 right-4">
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="w-5 h-5"
                          aria-invalid={!!hasError}
                        />
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          isSelected ? "bg-primary/20" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 ${
                            isSelected ? "text-primary" : option.color
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold">
                          {option.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>

                      {/* Selected Badge */}
                      {isSelected && !hasError && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}

                      {/* Hover Effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl transition-opacity duration-200 ${
                          isSelected
                            ? "bg-gradient-to-br from-primary/5 to-transparent opacity-100"
                            : "bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
            {currentErrors.personality && (
              <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                <AlertCircle className="h-3 w-3" />
                {currentErrors.personality}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Hidden submit button for form submission */}
        <button type="submit" className="hidden" aria-hidden="true" />
      </form>
    </div>
  );
}
