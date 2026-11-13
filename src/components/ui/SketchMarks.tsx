import React from "react";

interface SketchProps {
  className?: string;
  color?: string;
}

/**
 * Hand-drawn imperfect ellipse loop for circling key words or framing poster moments.
 */
export function HandCircle({
  className = "",
  color = "currentColor",
}: SketchProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 84"
      fill="none"
      className={className}
    >
      <path
        d="M 18 46 C 14 21, 76 10, 128 13 C 182 16, 211 31, 206 50 C 201 71, 140 77, 86 73 C 38 69, 9 54, 24 33 C 33 20, 62 15, 92 16"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn sweeping underline with organic taper.
 */
export function HandUnderline({
  className = "",
  color = "#1D3FFF",
}: SketchProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 24"
      fill="none"
      className={className}
    >
      <path
        d="M 4 15 C 68 7, 152 17, 274 9"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 18 20 C 92 14, 178 19, 250 14"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />
    </svg>
  );
}

/**
 * Small hand-drawn curved margin arrow pointing to annotations.
 */
export function HandArrow({
  className = "",
  color = "#1D3FFF",
}: SketchProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 88 52"
      fill="none"
      className={className}
    >
      <path
        d="M 6 44 C 22 18, 48 12, 76 20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 67 11 L 78 21 L 64 27"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Organic ink strikethrough for crossed-out sketchbook revisions.
 */
export function HandStrike({
  className = "",
  color = "#1D3FFF",
}: SketchProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 28"
      fill="none"
      className={className}
    >
      <path
        d="M 3 16 C 48 11, 126 19, 177 11"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Tiny loose spiral / sketchbook scribble discovered in margins.
 */
export function HandScribble({
  className = "",
  color = "#1D3FFF",
}: SketchProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      <path
        d="M 32 32 C 34 26, 42 28, 40 35 C 38 43, 25 43, 23 34 C 20 22, 36 16, 46 24 C 57 34, 48 52, 31 51 C 15 50, 10 32, 20 18"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface BlueThreadProps {
  variant?: "sweep" | "loop" | "margin";
  gravityOff?: boolean;
  className?: string;
}

/**
 * Recurring signature #1D3FFF artist thread that escapes grid borders
 * and lifts subtly when gravity is switched off.
 */
export function BlueThread({
  variant = "sweep",
  gravityOff = false,
  className = "",
}: BlueThreadProps) {
  const driftClass = gravityOff ? "-translate-y-1.5 rotate-[1.2deg]" : "";

  if (variant === "loop") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 360 72"
        fill="none"
        preserveAspectRatio="none"
        className={`pointer-events-none transition-transform duration-700 ease-out ${driftClass} ${className}`}
      >
        <path
          d="M 2 44 C 78 60, 146 62, 198 38 C 228 24, 212 8, 190 16 C 170 23, 186 52, 236 46 C 282 40, 322 22, 358 14"
          stroke="#1D3FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === "margin") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 160"
        fill="none"
        className={`pointer-events-none transition-transform duration-700 ease-out ${driftClass} ${className}`}
      >
        <path
          d="M 26 4 C 14 38, 38 66, 22 104 C 12 128, 18 144, 24 154"
          stroke="#1D3FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="154" r="2.5" fill="#1D3FFF" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 48"
      fill="none"
      preserveAspectRatio="none"
      className={`pointer-events-none transition-transform duration-700 ease-out ${driftClass} ${className}`}
    >
      <path
        d="M 2 34 C 94 10, 212 42, 304 16 C 350 4, 388 12, 418 22"
        stroke="#1D3FFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
