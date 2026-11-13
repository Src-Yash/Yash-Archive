import React from "react";

/**
 * Global brand configuration for Yash Srivastava's personal archive.
 * Centralized so that a future custom personal logo/mark or signature
 * can be plugged in without refactoring layout or section components.
 */
export const BRAND_CONFIG = {
  name: "YASH SRIVASTAVA",
  shortMark: "YS.",
  descriptor: "DEVELOPER / CREATOR / THINKER",
  headline: "I BUILD THINGS THAT LIVE ON THE INTERNET.",
  supportingCopy:
    "Developer exploring AI, open source, and the space between code and creativity.",
} as const;

interface BrandWordmarkProps {
  className?: string;
  showDescriptor?: boolean;
  descriptorClassName?: string;
  onClick?: () => void;
}

/**
 * Primary typographic wordmark for YASH SRIVASTAVA.
 * Designed to be clean, editorial, and easily replaceable with a custom
 * personal logo/mark later.
 */
export function BrandWordmark({
  className = "",
  showDescriptor = false,
  descriptorClassName = "",
}: BrandWordmarkProps) {
  return (
    <span className={`inline-flex flex-col text-left ${className}`}>
      <span className="font-display text-sm font-bold tracking-[0.14em] text-ink uppercase transition-colors sm:text-base">
        {BRAND_CONFIG.name}
      </span>
      {showDescriptor && (
        <span
          className={`font-mono text-[10px] tracking-[0.16em] text-muted uppercase ${descriptorClassName}`}
        >
          {BRAND_CONFIG.descriptor}
        </span>
      )}
    </span>
  );
}

interface BrandMarkProps {
  className?: string;
}

/**
 * Minimal temporary personal mark ("YS.") used only where a compact symbol
 * is technically necessary (e.g. mobile triggers, small loading states, compact indicators).
 * Will be replaced when the user provides their custom mark later.
 */
export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-baseline font-display font-bold tracking-tight text-ink ${className}`}
      aria-label="Yash Srivastava"
    >
      <span>YS</span>
      <span className="text-blue">.</span>
    </span>
  );
}
