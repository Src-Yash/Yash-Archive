import React from "react";
import { HandArrow } from "@/components/ui/SketchMarks";

interface ProjectPlateProps {
  variant: "echo" | "yojana" | "workspace" | "future";
  title: string;
  codeExcerpt?: {
    label: string;
    lines: string[];
  };
}

/**
 * Exhibition-style bespoke project visuals rooted in authentic code fragments,
 * signal geometry, policy translation, and spatial sketchbook composition—never fake SaaS dashboards.
 */
export function ProjectPlate({
  variant,
  title,
  codeExcerpt,
}: ProjectPlateProps) {
  if (variant === "echo") {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#121212] p-6 text-[#F2EFE8] md:p-10">
        {/* Continuous acoustic line broken by one blue anomaly spike */}
        <div className="flex items-center justify-between font-mono text-[11px] text-[#9F9B93]">
          <span>{codeExcerpt?.label ?? "listener.py"}</span>
          <span className="text-[#1D3FFF]">● acoustic drift</span>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 720 180"
          className="my-4 w-full"
          fill="none"
        >
          <line
            x1="0"
            y1="112"
            x2="720"
            y2="112"
            stroke="#2A2A27"
            strokeWidth="1"
          />
          <path
            d="M 0 112 C 65 112, 95 106, 130 112 C 175 120, 215 108, 260 112 L 320 112 L 336 96 L 352 128 L 368 24 L 386 154 L 404 82 L 420 112 C 470 112, 540 107, 610 112 L 720 112"
            stroke="#F2EFE8"
            strokeWidth="1.6"
            strokeOpacity="0.45"
          />
          <path
            d="M 336 96 L 352 128 L 368 24 L 386 154 L 404 82"
            stroke="#1D3FFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="368" cy="24" r="5" fill="#1D3FFF" />
          <text
            x="384"
            y="32"
            fill="#F2EFE8"
            fontSize="11"
            fontFamily="monospace"
          >
            z &gt; 3.2σ · silent drift caught
          </text>
        </svg>

        {codeExcerpt ? (
          <pre className="overflow-x-auto border-t border-[#2A2A27] pt-4 font-mono text-[11px] leading-relaxed text-[#E2DDD4] md:text-xs">
            <code>{codeExcerpt.lines.join("\n")}</code>
          </pre>
        ) : (
          <p className="font-mono text-xs text-[#9F9B93]">{title}</p>
        )}
      </div>
    );
  }

  if (variant === "yojana") {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#EBE7DE] p-6 md:p-10">
        <div className="grid h-full grid-cols-1 items-center gap-6 md:grid-cols-11">
          {/* Raw Bureaucratic Circular */}
          <div className="border border-[#121212]/25 bg-[#F2EFE8] p-5 md:col-span-5">
            <p className="font-mono text-[10px] tracking-[0.12em] text-[#706D67] uppercase">
              Gazette Circular § 4.2(b)
            </p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-[#121212]/75">
              &ldquo;Subject to sub-clause (ii) of notification 14/2026,
              applicants within threshold B-1 must furnish domicile annexures
              prior to disbursement...&rdquo;
            </p>
          </div>

          {/* Hand-drawn Blue Bridge */}
          <div className="flex flex-col items-center justify-center md:col-span-1">
            <HandArrow className="h-9 w-14 rotate-90 md:rotate-0" color="#1D3FFF" />
          </div>

          {/* Plain Human Pathway */}
          <div className="border border-[#121212] bg-[#121212] p-5 text-[#F2EFE8] md:col-span-5">
            <p className="font-mono text-[10px] tracking-[0.14em] text-[#9F9B93] uppercase">
              Translated for citizens
            </p>
            <ol className="mt-3 space-y-2 font-sans text-sm leading-snug">
              <li>1. You qualify if household income is under the state tier.</li>
              <li>2. Bring Aadhaar + local residency proof.</li>
              <li className="text-[#1D3FFF] brightness-150">
                → Verified from Clause 4.2(b)
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "workspace") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#EBE7DE] p-6 md:p-10">
        <svg
          aria-hidden="true"
          viewBox="0 0 680 340"
          className="h-full w-full"
          fill="none"
        >
          {/* Architectural sketchbook floorplan */}
          <rect
            x="28"
            y="28"
            width="624"
            height="284"
            stroke="#121212"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <rect
            x="56"
            y="58"
            width="210"
            height="148"
            fill="#F2EFE8"
            stroke="#121212"
            strokeWidth="1.4"
          />
          <text x="74" y="92" fill="#121212" fontSize="14" fontFamily="sans-serif" fontWeight="600">
            Project Rooms
          </text>
          <text x="74" y="118" fill="#706D67" fontSize="11" fontFamily="monospace">
            specs · decisions · files
          </text>

          <rect
            x="234"
            y="112"
            width="230"
            height="156"
            fill="#F2EFE8"
            stroke="#1D3FFF"
            strokeWidth="1.8"
          />
          <text x="254" y="150" fill="#1D3FFF" fontSize="14" fontFamily="sans-serif" fontWeight="600">
            Semester Handoff
          </text>
          <text x="254" y="176" fill="#121212" fontSize="11" fontFamily="monospace">
            nothing lost at graduation
          </text>

          <rect
            x="432"
            y="48"
            width="192"
            height="136"
            fill="#121212"
          />
          <text x="452" y="84" fill="#F2EFE8" fontSize="14" fontFamily="sans-serif" fontWeight="600">
            Cohort Archive
          </text>
          <text x="452" y="108" fill="#9F9B93" fontSize="11" fontFamily="monospace">
            2024 → 2025 → 2026
          </text>

          <path
            d="M 164 206 C 164 260, 200 260, 234 236"
            stroke="#1D3FFF"
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />
          <circle cx="234" cy="236" r="4" fill="#1D3FFF" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#F2EFE8] p-8">
      <svg
        aria-hidden="true"
        viewBox="0 0 600 320"
        className="h-full w-full"
        fill="none"
      >
        <rect
          x="32"
          y="24"
          width="536"
          height="272"
          stroke="#D6D1C8"
          strokeDasharray="5 5"
        />
        <path
          d="M 210 164 C 250 130, 340 185, 390 148"
          stroke="#1D3FFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="300" cy="158" r="4" fill="#1D3FFF" />
        <text
          x="300"
          y="206"
          textAnchor="middle"
          fill="#706D67"
          fontSize="12"
          fontFamily="monospace"
        >
          open page · reserved for next build
        </text>
      </svg>
    </div>
  );
}

interface CreatePlateProps {
  kind: "timeline" | "poster" | "negative" | "sketch" | "transit" | "motion";
  title: string;
}

export function CreatePlate({ kind, title }: CreatePlateProps) {
  if (kind === "timeline") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 640 360"
        className="h-full w-full bg-[#121212]"
        fill="none"
      >
        {/* Film sprockets top & bottom */}
        {Array.from({ length: 12 }).map((_, idx) => (
          <React.Fragment key={idx}>
            <rect
              x={22 + idx * 52}
              y="12"
              width="22"
              height="12"
              rx="2"
              fill="#262624"
            />
            <rect
              x={22 + idx * 52}
              y="336"
              width="22"
              height="12"
              rx="2"
              fill="#262624"
            />
          </React.Fragment>
        ))}
        {/* Timeline cuts */}
        <rect x="34" y="92" width="168" height="58" fill="#1E1E1C" stroke="#3B3B37" />
        <rect x="212" y="92" width="218" height="58" fill="#1E1E1C" stroke="#1D3FFF" strokeWidth="1.8" />
        <rect x="440" y="92" width="166" height="58" fill="#1E1E1C" stroke="#3B3B37" />
        {/* Acoustic waveform */}
        <path
          d="M 34 236 L 80 236 L 96 208 L 112 260 L 128 218 L 144 246 L 160 236 L 260 236 L 276 196 L 292 272 L 308 206 L 324 252 L 340 236 L 478 236 L 494 202 L 510 258 L 526 236 L 606 236"
          stroke="#F2EFE8"
          strokeOpacity="0.85"
          strokeWidth="1.5"
        />
        <line x1="316" y1="54" x2="316" y2="306" stroke="#1D3FFF" strokeWidth="2" />
        <text x="34" y="302" fill="#8C887F" fontSize="11" fontFamily="monospace">
          24fps cut · {title.toLowerCase()}
        </text>
      </svg>
    );
  }

  if (kind === "poster") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 420 540"
        className="h-full w-full bg-[#EBE7DE]"
        fill="none"
      >
        <rect x="24" y="24" width="372" height="492" stroke="#121212" strokeWidth="1.4" />
        <circle cx="210" cy="214" r="126" fill="#121212" />
        <circle cx="272" cy="158" r="34" fill="#1D3FFF" />
        <path
          d="M 74 374 C 154 366, 260 382, 346 370"
          stroke="#121212"
          strokeWidth="1.6"
        />
        <text
          x="44"
          y="430"
          fill="#121212"
          fontSize="30"
          fontFamily="sans-serif"
          fontWeight="700"
          letterSpacing="-1"
        >
          STATIC / SIGNAL
        </text>
        <text x="44" y="468" fill="#706D67" fontSize="11" fontFamily="monospace">
          print study · 02
        </text>
      </svg>
    );
  }

  if (kind === "sketch") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 440 440"
        className="h-full w-full bg-[#F2EFE8]"
        fill="none"
      >
        {/* Notebook margin line */}
        <line x1="56" y1="0" x2="56" y2="440" stroke="#1D3FFF" strokeOpacity="0.25" strokeWidth="1.2" />
        <rect x="86" y="72" width="152" height="96" stroke="#121212" strokeWidth="1.5" />
        <path d="M 238 122 C 296 122, 294 186, 290 218" stroke="#1D3FFF" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="288" cy="272" r="56" stroke="#121212" strokeWidth="1.4" strokeDasharray="3 4" />
        <path d="M 102 292 L 194 286 L 170 364 L 88 344 Z" stroke="#706D67" strokeWidth="1.3" />
        <path d="M 90 48 C 140 44, 196 50, 238 45" stroke="#121212" strokeOpacity="0.3" />
        <text x="86" y="400" fill="#121212" fontSize="11" fontFamily="monospace">
          notebook ink — {title.toLowerCase()}
        </text>
      </svg>
    );
  }

  if (kind === "transit") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 640 360"
        className="h-full w-full bg-[#191816]"
        fill="none"
      >
        <rect x="24" y="24" width="592" height="312" stroke="#3E3C37" />
        <line x1="24" y1="234" x2="616" y2="234" stroke="#F2EFE8" strokeOpacity="0.4" />
        <path d="M 100 234 L 228 84 L 412 84 L 542 234" stroke="#F2EFE8" strokeOpacity="0.22" strokeWidth="1.5" />
        <rect x="196" y="122" width="72" height="112" fill="#F2EFE8" fillOpacity="0.08" stroke="#F2EFE8" strokeOpacity="0.3" />
        <rect x="372" y="122" width="72" height="112" fill="#F2EFE8" fillOpacity="0.08" stroke="#F2EFE8" strokeOpacity="0.3" />
        <circle cx="516" cy="84" r="9" fill="#1D3FFF" />
        <text x="44" y="312" fill="#8C887F" fontSize="11" fontFamily="monospace">
          35mm night platform · tri-x 400
        </text>
      </svg>
    );
  }

  if (kind === "negative") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 420 520"
        className="h-full w-full bg-[#121212]"
        fill="none"
      >
        <rect x="44" y="44" width="332" height="432" stroke="#302F2C" />
        <rect x="92" y="102" width="236" height="236" fill="#F2EFE8" />
        <circle cx="210" cy="220" r="76" fill="#121212" />
        <rect x="207" y="88" width="6" height="264" fill="#1D3FFF" />
        <text x="92" y="416" fill="#EBE7DE" fontSize="11" fontFamily="monospace">
          {title.toLowerCase()}
        </text>
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 440 440"
      className="h-full w-full bg-[#EBE7DE]"
      fill="none"
    >
      <circle cx="220" cy="220" r="146" stroke="#121212" strokeDasharray="3 6" />
      <circle cx="220" cy="220" r="92" stroke="#121212" />
      <circle cx="220" cy="220" r="44" stroke="#1D3FFF" strokeWidth="2" />
      <circle cx="288" cy="152" r="8" fill="#1D3FFF" />
      <text x="48" y="408" fill="#706D67" fontSize="11" fontFamily="monospace">
        motion study · 04
      </text>
    </svg>
  );
}
