"use client";

import React from "react";
import { motion } from "framer-motion";
import { useArchive } from "@/components/context/ArchiveProvider";
import { BlueThread } from "@/components/ui/SketchMarks";

interface EditorialInterludeProps {
  quote: string;
  annotation?: string;
  bleedWord?: string;
}

/**
 * Brief unexpected pause between chapters—breaking grid symmetry with an
 * escaping blue ink thread and a quiet margin thought.
 */
export function EditorialInterlude({
  quote,
  annotation,
  bleedWord,
}: EditorialInterludeProps) {
  const { gravityOn, reducedMotion } = useArchive();

  return (
    <aside
      aria-label="Editorial note between chapters"
      className="relative overflow-x-clip border-t border-line py-20 md:py-28"
    >
      {/* Escaping thin #1D3FFF thread breaking across the margin */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-[-4%] w-[46%] md:w-[34%]"
      >
        <BlueThread
          variant="loop"
          gravityOff={!gravityOn && !reducedMotion}
          className="h-14 w-full"
        />
      </div>

      {/* Subtle oversized edge-bleed typography */}
      {bleedWord ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-2vw] bottom-2 font-display text-[clamp(4rem,13vw,11rem)] leading-none font-bold tracking-[-0.05em] text-ink/[0.045] uppercase select-none"
        >
          {bleedWord}
        </span>
      ) : null}

      <div className="editorial-container relative z-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-4 gap-6 md:grid-cols-12"
        >
          <div className="col-span-4 md:col-span-8 md:col-start-3">
            <blockquote className="font-display text-2xl leading-[1.18] font-semibold tracking-tight text-ink md:text-4xl">
              &ldquo;{quote}&rdquo;
            </blockquote>
            {annotation ? (
              <p className="mt-4 font-sans text-sm italic text-blue">
                ↳ {annotation}
              </p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
