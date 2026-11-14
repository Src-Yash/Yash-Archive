"use client";

import React, { useEffect, useRef, useState } from "react";
import { useArchive } from "@/components/context/ArchiveProvider";

interface AbstractBrainProps {
  activeThoughtIndex: number | null;
  className?: string;
}

// Conceptual cortical curve points and synapse nodes
const NODES = [
  // Left hemisphere
  { id: "L1", x: 190, y: 110, r: 3.5 },
  { id: "L2", x: 140, y: 160, r: 4.5 },
  { id: "L3", x: 120, y: 230, r: 4 },
  { id: "L4", x: 150, y: 300, r: 5 },
  { id: "L5", x: 210, y: 350, r: 4 },
  { id: "L6", x: 210, y: 210, r: 5 },
  { id: "L7", x: 170, y: 250, r: 3 },
  // Right hemisphere
  { id: "R1", x: 310, y: 110, r: 3.5 },
  { id: "R2", x: 360, y: 160, r: 4.5 },
  { id: "R3", x: 380, y: 230, r: 4 },
  { id: "R4", x: 350, y: 300, r: 5 },
  { id: "R5", x: 290, y: 350, r: 4 },
  { id: "R6", x: 290, y: 210, r: 5 },
  { id: "R7", x: 330, y: 250, r: 3 },
  // Center bridge (Corpus Callosum)
  { id: "C1", x: 250, y: 160, r: 3.5 },
  { id: "C2", x: 250, y: 240, r: 6 },
  { id: "C3", x: 250, y: 310, r: 4 },
];

const CONNECTIONS = [
  ["L1", "L2"], ["L2", "L3"], ["L3", "L4"], ["L4", "L5"], ["L5", "L6"], ["L6", "L1"],
  ["L2", "L6"], ["L3", "L7"], ["L7", "L4"], ["L6", "L7"],
  ["R1", "R2"], ["R2", "R3"], ["R3", "R4"], ["R4", "R5"], ["R5", "R6"], ["R6", "R1"],
  ["R2", "R6"], ["R3", "R7"], ["R7", "R4"], ["R6", "R7"],
  ["L1", "C1"], ["R1", "C1"],
  ["L6", "C2"], ["R6", "C2"],
  ["L5", "C3"], ["R5", "C3"],
  ["C1", "C2"], ["C2", "C3"],
];

// Mapping thought index (0..4) to peripheral anchor connections
const THOUGHT_ANCHORS = [
  { thoughtIdx: 0, fromNode: "L5", endX: 40, endY: 380 },   // doing a little more (bottom left)
  { thoughtIdx: 1, fromNode: "R2", endX: 460, endY: 130 },  // be the change (top right)
  { thoughtIdx: 2, fromNode: "C1", endX: 250, endY: 30 },   // hidden battles (top center)
  { thoughtIdx: 3, fromNode: "L2", endX: 40, endY: 130 },   // becoming better (top left)
  { thoughtIdx: 4, fromNode: "R5", endX: 460, endY: 380 },  // another human soul (bottom right)
];

export function AbstractBrain({
  activeThoughtIndex,
  className = "",
}: AbstractBrainProps) {
  const { reducedMotion } = useArchive();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);

  // IntersectionObserver to pause continuous animations when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle clock for gentle pulsing of synaptic nodes
  useEffect(() => {
    if (reducedMotion || !isInView) return;

    const interval = window.setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 80);

    return () => window.clearInterval(interval);
  }, [reducedMotion, isInView]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 420"
        className="w-full max-w-[500px] h-auto overflow-visible drop-shadow-md"
      >
        <defs>
          <radialGradient id="brainCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1D3FFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1D3FFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Core Ambient Glow */}
        <circle
          cx="250"
          cy="230"
          r="140"
          fill="url(#brainCoreGlow)"
          className={`transition-opacity duration-700 ${
            activeThoughtIndex !== null ? "opacity-90" : "opacity-40"
          }`}
        />

        {/* Curvilinear Cortical Contours (Outer Abstract Hemispheric Shells) */}
        <g className="transition-opacity duration-500 opacity-60">
          {/* Left cortical flow */}
          <path
            d="M 250,90 C 180,85 110,130 90,210 C 75,270 120,340 180,370 C 210,385 240,360 250,340"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="text-line"
          />
          {/* Right cortical flow */}
          <path
            d="M 250,90 C 320,85 390,130 410,210 C 425,270 380,340 320,370 C 290,385 260,360 250,340"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="text-line"
          />
        </g>

        {/* Thought Anchor Ray Lines */}
        {THOUGHT_ANCHORS.map((anchor) => {
          const from = NODES.find((n) => n.id === anchor.fromNode);
          if (!from) return null;
          const isActive = activeThoughtIndex === anchor.thoughtIdx;

          return (
            <g key={`ray-${anchor.thoughtIdx}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={anchor.endX}
                y2={anchor.endY}
                stroke={isActive ? "#1D3FFF" : "currentColor"}
                strokeWidth={isActive ? "2" : "1"}
                strokeDasharray={isActive ? "none" : "2 4"}
                className={`transition-all duration-300 ${
                  isActive
                    ? "opacity-100 text-blue"
                    : "opacity-25 text-muted"
                }`}
              />
              {/* Peripheral Target Pulse Point */}
              <circle
                cx={anchor.endX}
                cy={anchor.endY}
                r={isActive ? 4.5 : 2}
                fill={isActive ? "#1D3FFF" : "currentColor"}
                className={`transition-all duration-300 ${
                  isActive ? "opacity-100 text-blue" : "opacity-40 text-muted"
                }`}
              />
            </g>
          );
        })}

        {/* Synaptic Network Connections */}
        <g>
          {CONNECTIONS.map(([idA, idB], idx) => {
            const nodeA = NODES.find((n) => n.id === idA);
            const nodeB = NODES.find((n) => n.id === idB);
            if (!nodeA || !nodeB) return null;

            // Oscillate opacity gently across connections
            const phaseOffset = (idx * 17) % 100;
            const diff = Math.abs(pulsePhase - phaseOffset);
            const wave = Math.sin((diff / 100) * Math.PI);
            const strokeOpacity = reducedMotion
              ? 0.35
              : 0.2 + (activeThoughtIndex !== null ? 0.3 : 0.2) * wave;

            return (
              <line
                key={`conn-${idA}-${idB}`}
                x1={nodeA.x}
                y1={nodeA.y}
                x2={nodeB.x}
                y2={nodeB.y}
                stroke={activeThoughtIndex !== null ? "#1D3FFF" : "currentColor"}
                strokeWidth={activeThoughtIndex !== null ? 1.4 : 1}
                strokeOpacity={strokeOpacity}
                className="transition-colors duration-300 text-ink"
              />
            );
          })}
        </g>

        {/* Synaptic Nodes */}
        <g>
          {NODES.map((node, i) => {
            const isCenter = node.id.startsWith("C");
            const nodePhase = (i * 13) % 100;
            const nodeScale = reducedMotion
              ? 1
              : 0.85 + 0.3 * Math.sin(((pulsePhase + nodePhase) / 100) * Math.PI * 2);

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={node.r * (activeThoughtIndex !== null ? 1.2 : nodeScale)}
                  fill={isCenter || activeThoughtIndex !== null ? "#1D3FFF" : "currentColor"}
                  className={`transition-all duration-300 ${
                    activeThoughtIndex !== null
                      ? "text-blue opacity-90"
                      : "text-ink opacity-75"
                  }`}
                />
                {/* Secondary halo on active / center nodes */}
                {(isCenter || activeThoughtIndex !== null) && (
                  <circle
                    r={node.r * 2.2}
                    fill="none"
                    stroke="#1D3FFF"
                    strokeWidth="0.8"
                    strokeOpacity={0.4}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
