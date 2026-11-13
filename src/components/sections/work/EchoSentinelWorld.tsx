"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Activity, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { useArchive } from "@/components/context/ArchiveProvider";

interface WorldProps {
  project: ProjectItem;
}

export function EchoSentinelWorld({ project }: WorldProps) {
  const { openProjectModal, reducedMotion } = useArchive();
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const telemetryMetrics = [
    { label: "STREAM", value: "EVENTS/SEC", stat: "14.2k" },
    { label: "LATENCY", value: "P99 INGEST", stat: "18ms" },
    { label: "BASELINE", value: "WINDOW", stat: "15m rolling" },
    { label: "DRIFT", value: "Z-SCORE", stat: "0.04σ" },
  ];

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2px] border border-[#222634] bg-[#0A0C10] text-[#F2EFE8] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.7)]"
    >
      {/* Background subtle telemetry grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Telemetry Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#1E2330] bg-[#0E1118]/90 px-6 py-3.5 font-mono text-[11px] backdrop-blur-md md:px-10">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
          </span>
          <span className="tracking-[0.18em] text-[#9EA4B0] uppercase">
            SYS://ECHOSENTINEL · STREAM ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-6 text-[#757D8E]">
          <span className="hidden sm:inline">INGESTION & OBSERVABILITY</span>
          <span className="font-semibold text-blue">{project.number} / 03</span>
        </div>
      </div>

      <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16">
        {/* Main Title & Concept Spread */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-blue">
                CHAPTER {project.number}
              </span>
              <span className="font-mono text-xs text-[#757D8E]">
                {project.year}
              </span>
            </div>

            <h3 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-white uppercase sm:text-4xl md:text-5xl lg:text-6xl">
              <button
                type="button"
                onClick={() => openProjectModal(project.slug)}
                data-cursor="VIEW"
                className="text-left transition-colors hover:text-blue focus-visible:text-blue"
              >
                {project.title}
                <span className="text-blue">.</span>
              </button>
            </h3>

            <p className="max-w-xl font-sans text-lg font-medium leading-relaxed text-[#D2D7E0] md:text-xl">
              {project.tagline}
            </p>

            <p className="max-w-xl font-sans text-sm leading-relaxed text-[#949CAE] md:text-base">
              {project.summary}
            </p>
          </div>

          {/* Real-time Telemetry Metrics Block */}
          <div className="grid grid-cols-2 gap-3 border-t border-[#1E2330] pt-6 sm:grid-cols-4 lg:col-span-5 lg:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {telemetryMetrics.map((item) => (
              <div
                key={item.label}
                className="border border-[#1E2330] bg-[#0E1118]/80 p-3.5 transition-colors hover:border-blue/50"
              >
                <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#757D8E] uppercase">
                  <span>{item.label}</span>
                  <Activity className="h-3 w-3 text-blue/70" />
                </div>
                <div className="mt-1.5 font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  {item.stat}
                </div>
                <div className="font-mono text-[10px] text-[#9EA4B0]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Signal Trace & Anomaly Waveform Component */}
        <div className="my-10 border border-[#1E2330] bg-[#07080B] p-5 md:my-14 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1A1E29] font-mono text-[11px] text-[#757D8E]">
            <span className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-blue" />
              <span>listener.py — rolling statistical evaluation</span>
            </span>
            <span className="text-blue font-medium">
              [ ANOMALY CAUGHT: z &gt; 3.2σ ]
            </span>
          </div>

          {/* Signal SVG with glowing pulse */}
          <div className="relative my-6 w-full overflow-hidden">
            <svg
              aria-hidden="true"
              viewBox="0 0 900 180"
              className="w-full"
              fill="none"
            >
              {/* Reference Grid Lines */}
              <line x1="0" y1="90" x2="900" y2="90" stroke="#1A1E29" strokeWidth="1" />
              <line x1="0" y1="40" x2="900" y2="40" stroke="#141720" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="900" y2="140" stroke="#141720" strokeWidth="1" strokeDasharray="4 4" />

              {/* Baseline Stream */}
              <path
                d="M 0 90 C 80 90, 110 82, 160 90 C 220 100, 260 85, 320 90 L 400 90 L 420 75 L 440 105 L 460 18 L 485 160 L 510 65 L 530 90 C 590 90, 680 84, 760 90 L 900 90"
                stroke="#4F5768"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Anomaly Signal Spike in Signature Blue */}
              <path
                d="M 420 75 L 440 105 L 460 18 L 485 160 L 510 65"
                stroke="#1D3FFF"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Pulse Marker */}
              <circle cx="460" cy="18" r="5" fill="#1D3FFF" />
              <circle cx="460" cy="18" r="10" stroke="#1D3FFF" strokeWidth="1.5" opacity="0.6" />

              {/* Telemetry Tag */}
              <text
                x="480"
                y="26"
                fill="#FFFFFF"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                z = 3.42σ · silent drift detected
              </text>
            </svg>
          </div>

          {/* Code excerpt block */}
          {project.codeExcerpt && (
            <div className="border-t border-[#1A1E29] pt-4">
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[#CED4DF]">
                <code>{project.codeExcerpt.lines.join("\n")}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Architecture Connection Nodes (Hover-reactive pipeline) */}
        <div className="mb-12">
          <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-[#757D8E] uppercase">
            SIGNAL INGESTION & TRIAGE PIPELINE (HOVER TO INSPECT)
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {project.story.architectureNodes.map((node, idx) => {
              const isHovered = activeNode === idx;
              return (
                <div
                  key={node}
                  onMouseEnter={() => setActiveNode(idx)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`border p-3 transition-all duration-200 cursor-pointer ${
                    isHovered
                      ? "border-blue bg-blue/15 text-white"
                      : "border-[#1E2330] bg-[#0E1118] text-[#9EA4B0] hover:border-[#384055]"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-[#757D8E]">
                    <span>0{idx + 1}</span>
                    <span className={isHovered ? "text-blue" : "text-[#4F5768]"}>
                      {isHovered ? "ACTIVE" : "NODE"}
                    </span>
                  </div>
                  <div className="mt-1.5 font-mono text-xs font-semibold text-white">
                    {node}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4-Beat Technical Narrative */}
        <div className="grid grid-cols-1 gap-6 border-t border-[#1E2330] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 border-l border-blue/80 pl-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-blue uppercase">
              [ 01 · THE IDEA ]
            </span>
            <p className="font-sans text-xs leading-relaxed text-[#CBD1DC] sm:text-sm">
              {project.story.idea}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#2E3547] pl-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#868F9F] uppercase">
              [ 02 · THE PROBLEM ]
            </span>
            <p className="font-sans text-xs leading-relaxed text-[#CBD1DC] sm:text-sm">
              {project.story.problem}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#2E3547] pl-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#868F9F] uppercase">
              [ 03 · WHAT I BUILT ]
            </span>
            <p className="font-sans text-xs leading-relaxed text-[#CBD1DC] sm:text-sm">
              {project.story.built}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#2E3547] pl-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#868F9F] uppercase">
              [ 04 · WHAT I LEARNED ]
            </span>
            <p className="font-sans text-xs leading-relaxed text-[#CBD1DC] sm:text-sm">
              {project.story.learned}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E2330] pt-6">
          <div className="font-mono text-xs text-[#757D8E]">
            {project.stack.join(" · ")}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => openProjectModal(project.slug)}
              data-cursor="STORY"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:text-blue"
            >
              <span>VIEW FULL STORY</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue" aria-hidden="true" />
            </button>

            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1 font-mono text-xs text-[#9EA4B0] underline decoration-[#2E3547] underline-offset-4 transition-colors hover:text-blue hover:decoration-blue"
            >
              <span>CHAPTER PAGE</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
