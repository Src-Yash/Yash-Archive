"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { JOURNEY_MILESTONES } from "@/data/journey";
import { useArchive } from "@/components/context/ArchiveProvider";
import { BlueThread } from "@/components/ui/SketchMarks";

export function Journey() {
  const { gravityOn, reducedMotion } = useArchive();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the entire timeline container
  // ["start 75%", "end 75%"] ensures the animated line leads naturally into view
  // so it is actively drawn past 2026 and completely reaches NOW without stopping early
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  const waypoints = [
    "WAYPOINT 01 · FOUNDATIONS",
    "WAYPOINT 02 · MISTAKES & TASTE",
    "WAYPOINT 03 · OPEN SOURCE & ARCHITECTURE",
    "WAYPOINT 04 · CURRENT CHAPTER",
  ];

  return (
    <section
      id="journey"
      className="relative overflow-x-clip border-t border-line py-24 md:py-36"
    >
      <div className="editorial-container">
        {/* Editorial Section Header */}
        <div className="mb-16 grid grid-cols-1 items-end gap-6 md:mb-28 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-3 font-mono text-xs text-muted">
              <span className="mr-3 font-semibold text-blue">03</span>
              <span className="tracking-[0.2em] uppercase">THE JOURNEY</span>
            </p>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink uppercase">
              A PATH THROUGH<br />TIME<span className="text-blue">.</span>
            </h2>
          </div>

          <div className="space-y-3 md:col-span-5 md:col-start-8">
            <p className="font-sans text-base leading-relaxed text-muted md:text-lg">
              Not a résumé. Just how curiosity turned into code, late-night bugs,
              taste, and real software.
            </p>
            <BlueThread
              variant="sweep"
              gravityOff={!gravityOn && !reducedMotion}
              className="h-7 w-44 opacity-80"
            />
          </div>
        </div>

        {/* Continuous Path Through Time (2024 → 2025 → 2026 → NOW) */}
        <div ref={timelineRef} className="relative py-4">
          
          {/* Desktop Authored Path Through Time (Meanders through central corridor between columns) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
          >
            <svg
              className="h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 1000"
              fill="none"
            >
              {/* Soft underlying structural guide path (Full length 0 -> 1000) */}
              <path
                d="M 50 0 C 40 80, 40 140, 50 200 C 60 260, 60 380, 50 470 C 40 560, 40 680, 50 780 C 60 860, 60 940, 50 1000"
                stroke="#D6D1C8"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              {/* Active scroll-reactive ink trace (Full length 0 -> 1000) */}
              <motion.path
                d="M 50 0 C 40 80, 40 140, 50 200 C 60 260, 60 380, 50 470 C 40 560, 40 680, 50 780 C 60 860, 60 940, 50 1000"
                stroke="#121212"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ pathLength: reducedMotion ? 1 : pathLength }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Mobile Authored Path Line (Running down left gutter) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-4 sm:left-6 z-0 block w-2 md:hidden"
          >
            <svg
              className="h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 2 1000"
              fill="none"
            >
              <path
                d="M 1 0 L 1 1000"
                stroke="#D6D1C8"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M 1 0 L 1 1000"
                stroke="#121212"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ pathLength: reducedMotion ? 1 : pathLength }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* All 4 Landmark Milestones in Continuous Alternating Layout */}
          <div className="relative z-10 space-y-24 md:space-y-36">
            {JOURNEY_MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isNow = item.year === "NOW";

              return (
                <motion.article
                  key={item.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 items-start gap-6 pl-10 sm:pl-12 md:grid-cols-12 md:gap-12 md:pl-0"
                >
                  {/* Landmark Year Marker */}
                  <div
                    className={`space-y-2 md:col-span-5 ${
                      isEven ? "md:col-start-1" : "md:col-start-8 md:order-2"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                      {isNow ? (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                        </span>
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                      )}
                      <span className={isNow ? "text-blue font-bold" : ""}>
                        {waypoints[idx]}
                      </span>
                    </div>

                    <p
                      className={`font-display text-[clamp(3.5rem,8vw,6.5rem)] font-extrabold leading-none tracking-[-0.05em] ${
                        isNow ? "text-blue" : "text-ink"
                      }`}
                    >
                      {item.year}
                    </p>

                    <p className="font-sans text-xs italic text-muted">
                      ↳ {item.marginWhisper}
                    </p>
                  </div>

                  {/* Narrative Exposition */}
                  <div
                    className={`space-y-4 md:col-span-6 ${
                      isEven
                        ? "md:col-start-7"
                        : "md:col-start-1 md:order-1 md:text-right"
                    }`}
                  >
                    <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink md:text-3xl">
                      {item.headline}
                    </h3>
                    <p
                      className={`font-sans text-sm leading-relaxed text-ink/80 md:text-base ${
                        isEven ? "max-w-xl" : "ml-auto max-w-xl"
                      }`}
                    >
                      {item.note}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
