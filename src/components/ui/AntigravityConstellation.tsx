"use client";

import React, { useEffect, useRef, useState } from "react";
import { useArchive } from "@/components/context/ArchiveProvider";

interface ConstellationNode {
  id: "code" | "create" | "music" | "thought";
  label: string;
  caption: string;
  targetSection: string;
  mindTab?: "listening" | "thinking";
  baseX: number; // percentage [0..100]
  baseY: number; // percentage [0..100]
  depth: number;
}

const NODES: ConstellationNode[] = [
  {
    id: "code",
    label: "CODE",
    caption: "systems & reliability",
    targetSection: "work",
    baseX: 24,
    baseY: 26,
    depth: 1.0,
  },
  {
    id: "create",
    label: "CREATE",
    caption: "24fps & form",
    targetSection: "create",
    baseX: 74,
    baseY: 22,
    depth: 1.35,
  },
  {
    id: "music",
    label: "MUSIC",
    caption: "late-night sound",
    targetSection: "mind",
    mindTab: "listening",
    baseX: 70,
    baseY: 73,
    depth: 0.9,
  },
  {
    id: "thought",
    label: "THOUGHT",
    caption: "quiet notebook",
    targetSection: "mind",
    mindTab: "thinking",
    baseX: 26,
    baseY: 75,
    depth: 1.2,
  },
];

interface Vec2 {
  x: number;
  y: number;
}

const ZERO_OFFSETS: Record<ConstellationNode["id"], Vec2> = {
  code: { x: 0, y: 0 },
  create: { x: 0, y: 0 },
  music: { x: 0, y: 0 },
  thought: { x: 0, y: 0 },
};

/**
 * Abstract, draggable 4-fragment ANTIGRAVITY centerpiece connected by a live
 * #1D3FFF ink spline. Responds to mouse parallax, dragging, and gravity toggle.
 */
export function AntigravityConstellation() {
  const { gravityOn, reducedMotion, scrollToSection, setMindPortal } =
    useArchive();

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Persistent user-dragged displacement per fragment (percentage of box width/height)
  const dragOffsetsRef = useRef<Record<ConstellationNode["id"], Vec2>>({
    code: { ...ZERO_OFFSETS.code },
    create: { ...ZERO_OFFSETS.create },
    music: { ...ZERO_OFFSETS.music },
    thought: { ...ZERO_OFFSETS.thought },
  });

  const dragSessionRef = useRef<{
    id: ConstellationNode["id"];
    startClientX: number;
    startClientY: number;
    startOffset: Vec2;
    moved: boolean;
  } | null>(null);

  const pointerParallaxRef = useRef<Vec2>({ x: 0, y: 0 });
  const [activeId, setActiveId] = useState<ConstellationNode["id"] | null>(null);
  const [wasDragged, setWasDragged] = useState(false);

  // Drive live node positions & SVG spline seamlessly via requestAnimationFrame
  useEffect(() => {
    const startTime = performance.now();
    let smoothPx = 0;
    let smoothPy = 0;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const targetPx = reducedMotion ? 0 : pointerParallaxRef.current.x;
      const targetPy = reducedMotion ? 0 : pointerParallaxRef.current.y;
      smoothPx += (targetPx - smoothPx) * 0.08;
      smoothPy += (targetPy - smoothPy) * 0.08;

      const pts: { x: number; y: number }[] = NODES.map((node, idx) => {
        const drag = dragOffsetsRef.current[node.id];
        const floatAmp = reducedMotion ? 0 : gravityOn ? 0.55 : 2.8;
        const floatX =
          floatAmp === 0
            ? 0
            : Math.sin(elapsed * (0.75 + idx * 0.14) + idx * 1.4) * floatAmp;
        const floatY =
          floatAmp === 0
            ? 0
            : Math.cos(elapsed * (0.65 + idx * 0.16) + idx * 0.9) *
              (floatAmp * 1.15);

        const parallaxScale = reducedMotion ? 0 : gravityOn ? 2.2 : 4.2;
        const px = smoothPx * node.depth * parallaxScale;
        const py = smoothPy * node.depth * parallaxScale;

        const x = Math.min(89, Math.max(11, node.baseX + drag.x + floatX + px));
        const y = Math.min(88, Math.max(12, node.baseY + drag.y + floatY + py));

        const el = nodeRefs.current[node.id];
        if (el) {
          el.style.left = `${x.toFixed(2)}%`;
          el.style.top = `${y.toFixed(2)}%`;
        }

        // Convert percentage [0..100] into SVG viewBox [0..400 x 0..320]
        return { x: x * 4, y: y * 3.2 };
      });

      if (pathRef.current && pts.length === 4) {
        const [p0, p1, p2, p3] = pts;
        // Organic closed curved thread linking Code -> Create -> Music -> Thought -> Code
        const d = [
          `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}`,
          `C ${(p0.x + 64).toFixed(1)} ${(p0.y - 26).toFixed(1)}, ${(p1.x - 58).toFixed(1)} ${(p1.y + 18).toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`,
          `C ${(p1.x + 18).toFixed(1)} ${(p1.y + 58).toFixed(1)}, ${(p2.x + 28).toFixed(1)} ${(p2.y - 52).toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`,
          `C ${(p2.x - 66).toFixed(1)} ${(p2.y + 22).toFixed(1)}, ${(p3.x + 56).toFixed(1)} ${(p3.y - 20).toFixed(1)}, ${p3.x.toFixed(1)} ${p3.y.toFixed(1)}`,
          `C ${(p3.x - 24).toFixed(1)} ${(p3.y - 54).toFixed(1)}, ${(p0.x - 16).toFixed(1)} ${(p0.y + 44).toFixed(1)}, ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}`,
        ].join(" ");
        pathRef.current.setAttribute("d", d);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [gravityOn, reducedMotion]);

  const handleContainerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || dragSessionRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerParallaxRef.current = { x: nx, y: ny };
  };

  const handleContainerPointerLeave = () => {
    pointerParallaxRef.current = { x: 0, y: 0 };
  };

  const handleNodePointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
    node: ConstellationNode
  ) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setActiveId(node.id);
    dragSessionRef.current = {
      id: node.id,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startOffset: { ...dragOffsetsRef.current[node.id] },
      moved: false,
    };
  };

  const handleNodePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const session = dragSessionRef.current;
    if (!session || !containerRef.current) return;

    const dx = e.clientX - session.startClientX;
    const dy = e.clientY - session.startClientY;
    if (Math.hypot(dx, dy) > 4) {
      session.moved = true;
      setWasDragged(true);
    }

    const rect = containerRef.current.getBoundingClientRect();
    const pctX = (dx / rect.width) * 100;
    const pctY = (dy / rect.height) * 100;

    dragOffsetsRef.current[session.id] = {
      x: Math.max(-34, Math.min(34, session.startOffset.x + pctX)),
      y: Math.max(-34, Math.min(34, session.startOffset.y + pctY)),
    };
  };

  const handleNodePointerUp = (
    e: React.PointerEvent<HTMLButtonElement>,
    node: ConstellationNode
  ) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const session = dragSessionRef.current;
    dragSessionRef.current = null;
    setActiveId(null);

    if (session && !session.moved) {
      activateNode(node);
    }
  };

  const activateNode = (node: ConstellationNode) => {
    if (node.mindTab) {
      setMindPortal(node.mindTab);
    }
    scrollToSection(node.targetSection);
  };

  const resetFragments = () => {
    dragOffsetsRef.current = {
      code: { ...ZERO_OFFSETS.code },
      create: { ...ZERO_OFFSETS.create },
      music: { ...ZERO_OFFSETS.music },
      thought: { ...ZERO_OFFSETS.thought },
    };
    setWasDragged(false);
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        onPointerMove={handleContainerPointerMove}
        onPointerLeave={handleContainerPointerLeave}
        aria-label="Interactive Antigravity constellation connecting code, creativity, music, and thoughts"
        className="relative h-[260px] w-full overflow-hidden border border-line/90 bg-paper-soft/55 select-none sm:h-[300px] md:h-[320px]"
      >
        {/* Subtle drafting crosshair hairlines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-1/2 right-4 left-4 h-px bg-line/60" />
          <div className="absolute top-4 bottom-4 left-1/2 w-px bg-line/60" />
          <div className="absolute top-3 left-3 font-mono text-[10px] text-muted/70">
            orbit / 04 fragments
          </div>
          <div className="absolute right-3 bottom-3 font-mono text-[10px] text-muted/70">
            {gravityOn ? "settled" : "weightless drift"}
          </div>
        </div>

        {/* Live #1D3FFF SVG thread linking the four fragments */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 320"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            ref={pathRef}
            d="M 96 83 C 160 57 238 88 296 70 C 314 128 308 182 280 234 C 214 256 160 220 104 240 C 80 186 80 127 96 83"
            fill="none"
            stroke="#1D3FFF"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeOpacity="0.82"
          />
        </svg>

        {/* Draggable + clickable constellation fragments */}
        {NODES.map((node) => {
          const isDragging = activeId === node.id;
          return (
            <button
              key={node.id}
              ref={(el) => {
                nodeRefs.current[node.id] = el;
              }}
              type="button"
              onPointerDown={(e) => handleNodePointerDown(e, node)}
              onPointerMove={handleNodePointerMove}
              onPointerUp={(e) => handleNodePointerUp(e, node)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  activateNode(node);
                }
              }}
              data-cursor="OPEN"
              aria-label={`${node.label}: ${node.caption}. Click to jump to section, or drag to rearrange.`}
              style={{
                left: `${node.baseX}%`,
                top: `${node.baseY}%`,
                touchAction: "none",
              }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 border bg-paper px-3 py-2 text-left shadow-sm transition-colors duration-200 ${
                isDragging
                  ? "z-20 cursor-grabbing border-blue"
                  : "z-10 cursor-grab border-line hover:border-blue"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    isDragging
                      ? "bg-blue"
                      : "bg-ink/40 group-hover:bg-blue"
                  }`}
                />
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-ink uppercase">
                  {node.label}
                </span>
              </span>
              <span className="mt-0.5 block font-sans text-[11px] italic text-muted">
                {node.caption}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 px-0.5">
        <p className="font-sans text-xs italic text-muted">
          drag a fragment to pull the line · click to enter
        </p>
        {wasDragged ? (
          <button
            type="button"
            onClick={resetFragments}
            className="font-mono text-[11px] text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue"
          >
            reset orbit
          </button>
        ) : null}
      </div>
    </div>
  );
}
