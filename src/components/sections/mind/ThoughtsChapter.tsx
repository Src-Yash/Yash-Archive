"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { THOUGHTS, type Thought } from "@/data/mind";
import { AbstractBrain } from "./AbstractBrain";
import { useModalDialog } from "@/components/ui/useModalDialog";

export function ThoughtsChapter() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

  const dialogRef = useModalDialog({
    isOpen: Boolean(selectedThought),
    onClose: () => setSelectedThought(null),
  });

  return (
    <article
      id="mind-thoughts"
      className="relative rounded-[2px] border border-line bg-paper text-ink shadow-lg overflow-hidden"
    >
      {/* Chapter Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-paper-soft/80 px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-blue">03</span>
          <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
            CHAPTER / THOUGHTS
          </span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          Things I haven&apos;t stopped thinking about.
        </p>
      </div>

      <div className="p-6 md:p-10 lg:p-16">
        {/* Editorial Subtitle */}
        <div className="mb-12 max-w-2xl space-y-2">
          <p className="font-mono text-[11px] tracking-[0.16em] text-blue uppercase">
            NEURAL NOTEBOOK &amp; CONSTELLATION
          </p>
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink uppercase sm:text-3xl md:text-4xl">
            THOUGHTS FORMING &amp; RETURNING
          </h3>
          <p className="font-sans text-sm text-muted leading-relaxed">
            Hover or tap any fragment around the thinking system to inspect the thread.
          </p>
        </div>

        {/* Desktop / Tablet Constellation Canvas (hidden on small mobile screens, replaced with mobile stack) */}
        <div className="relative mx-auto hidden md:flex items-center justify-center min-h-[580px] w-full max-w-5xl my-6">
          {/* Central Abstract Brain Visual */}
          <div className="relative z-10 w-full max-w-lg">
            <AbstractBrain activeThoughtIndex={hoveredIdx} />
          </div>

          {/* Peripheral Thought Fragments positioned organically around the brain */}
          {/* Fragment 01: doing a little more (Bottom Left) */}
          <button
            type="button"
            onClick={() => setSelectedThought(THOUGHTS[0])}
            onMouseEnter={() => setHoveredIdx(0)}
            onMouseLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(0)}
            onBlur={() => setHoveredIdx(null)}
            aria-label={`Read Thought 01: ${THOUGHTS[0].title}`}
            className={`group absolute left-4 bottom-14 z-20 flex items-center gap-3 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue ${
              hoveredIdx !== null && hoveredIdx !== 0 ? "opacity-35" : "opacity-100"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                hoveredIdx === 0 ? "bg-blue scale-150" : "bg-muted group-hover:bg-blue"
              }`}
              aria-hidden="true"
            />
            <div className="border border-line/70 bg-paper/95 px-3.5 py-2 backdrop-blur-sm transition-all duration-300 group-hover:border-blue group-hover:shadow-md">
              <span className="block font-mono text-[10px] text-muted tracking-widest uppercase">
                THOUGHT 01
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-ink group-hover:text-blue">
                &ldquo;{THOUGHTS[0].fragment}&rdquo;
              </span>
            </div>
          </button>

          {/* Fragment 02: be the change (Top Right) */}
          <button
            type="button"
            onClick={() => setSelectedThought(THOUGHTS[1])}
            onMouseEnter={() => setHoveredIdx(1)}
            onMouseLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(1)}
            onBlur={() => setHoveredIdx(null)}
            aria-label={`Read Thought 02: ${THOUGHTS[1].title}`}
            className={`group absolute right-4 top-16 z-20 flex items-center gap-3 text-right transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue ${
              hoveredIdx !== null && hoveredIdx !== 1 ? "opacity-35" : "opacity-100"
            }`}
          >
            <div className="border border-line/70 bg-paper/95 px-3.5 py-2 backdrop-blur-sm transition-all duration-300 group-hover:border-blue group-hover:shadow-md">
              <span className="block font-mono text-[10px] text-muted tracking-widest uppercase">
                THOUGHT 02
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-ink group-hover:text-blue">
                &ldquo;{THOUGHTS[1].fragment}&rdquo;
              </span>
            </div>
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                hoveredIdx === 1 ? "bg-blue scale-150" : "bg-muted group-hover:bg-blue"
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Fragment 03: hidden battles (Top Center) */}
          <button
            type="button"
            onClick={() => setSelectedThought(THOUGHTS[2])}
            onMouseEnter={() => setHoveredIdx(2)}
            onMouseLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(2)}
            onBlur={() => setHoveredIdx(null)}
            aria-label={`Read Thought 03: ${THOUGHTS[2].title}`}
            className={`group absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue ${
              hoveredIdx !== null && hoveredIdx !== 2 ? "opacity-35" : "opacity-100"
            }`}
          >
            <div className="border border-line/70 bg-paper/95 px-4 py-2 backdrop-blur-sm transition-all duration-300 group-hover:border-blue group-hover:shadow-md">
              <span className="block font-mono text-[10px] text-muted tracking-widest uppercase">
                THOUGHT 03
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-ink group-hover:text-blue">
                &ldquo;{THOUGHTS[2].fragment}&rdquo;
              </span>
            </div>
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                hoveredIdx === 2 ? "bg-blue scale-150" : "bg-muted group-hover:bg-blue"
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Fragment 04: becoming better (Top Left) */}
          <button
            type="button"
            onClick={() => setSelectedThought(THOUGHTS[3])}
            onMouseEnter={() => setHoveredIdx(3)}
            onMouseLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(3)}
            onBlur={() => setHoveredIdx(null)}
            aria-label={`Read Thought 04: ${THOUGHTS[3].title}`}
            className={`group absolute left-4 top-16 z-20 flex items-center gap-3 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue ${
              hoveredIdx !== null && hoveredIdx !== 3 ? "opacity-35" : "opacity-100"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                hoveredIdx === 3 ? "bg-blue scale-150" : "bg-muted group-hover:bg-blue"
              }`}
              aria-hidden="true"
            />
            <div className="border border-line/70 bg-paper/95 px-3.5 py-2 backdrop-blur-sm transition-all duration-300 group-hover:border-blue group-hover:shadow-md">
              <span className="block font-mono text-[10px] text-muted tracking-widest uppercase">
                THOUGHT 04
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-ink group-hover:text-blue">
                &ldquo;{THOUGHTS[3].fragment}&rdquo;
              </span>
            </div>
          </button>

          {/* Fragment 05: another human soul (Bottom Right) */}
          <button
            type="button"
            onClick={() => setSelectedThought(THOUGHTS[4])}
            onMouseEnter={() => setHoveredIdx(4)}
            onMouseLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(4)}
            onBlur={() => setHoveredIdx(null)}
            aria-label={`Read Thought 05: ${THOUGHTS[4].title}`}
            className={`group absolute right-4 bottom-14 z-20 flex items-center gap-3 text-right transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue ${
              hoveredIdx !== null && hoveredIdx !== 4 ? "opacity-35" : "opacity-100"
            }`}
          >
            <div className="border border-line/70 bg-paper/95 px-3.5 py-2 backdrop-blur-sm transition-all duration-300 group-hover:border-blue group-hover:shadow-md">
              <span className="block font-mono text-[10px] text-muted tracking-widest uppercase">
                THOUGHT 05
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-ink group-hover:text-blue">
                &ldquo;{THOUGHTS[4].fragment}&rdquo;
              </span>
            </div>
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                hoveredIdx === 4 ? "bg-blue scale-150" : "bg-muted group-hover:bg-blue"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Mobile View: Central Brain Anchor + Vertical Fragment Stream */}
        <div className="md:hidden space-y-8">
          <div className="w-full max-w-xs mx-auto py-4">
            <AbstractBrain activeThoughtIndex={hoveredIdx} />
          </div>

          <div className="space-y-3 pt-2">
            <p className="font-mono text-[10px] text-muted tracking-widest uppercase">
              TOUCH A THOUGHT TO READ
            </p>
            <div className="space-y-2.5">
              {THOUGHTS.map((thought) => (
                <button
                  key={thought.id}
                  type="button"
                  onClick={() => setSelectedThought(thought)}
                  className="flex w-full items-center justify-between border border-line bg-paper-soft/60 px-4 py-3.5 text-left transition-colors active:border-blue active:bg-paper"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-blue">
                      {thought.number}
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">
                        &ldquo;{thought.fragment}&rdquo;
                      </p>
                      <p className="font-mono text-[10px] text-muted tracking-wider uppercase">
                        {thought.title}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-blue">READ &rarr;</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Focused Editorial Reading State Modal */}
      {selectedThought && (
        <dialog
          ref={dialogRef}
          closedby="any"
          aria-labelledby="thought-dialog-title"
          className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border border-line bg-paper p-0 text-ink shadow-2xl backdrop:bg-black/45"
        >
          <div className="p-6 sm:p-10 md:p-12 space-y-8">
            <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-2 font-mono text-xs text-blue uppercase tracking-widest">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>
                  THOUGHT {selectedThought.number} / {THOUGHTS.length}
                </span>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setSelectedThought(null)}
                aria-label="Close reading state"
                className="inline-flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs text-muted uppercase tracking-widest">
                ESSAY FRAGMENT &middot; {selectedThought.title}
              </p>
              <h3
                id="thought-dialog-title"
                className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
              >
                &ldquo;{selectedThought.fragment}&rdquo;
              </h3>
            </div>

            {/* Complete Editorial Text (Preserved verbatim) */}
            <div className="border-l-2 border-blue bg-paper-soft/40 pl-6 py-2">
              <div className="space-y-4 font-sans text-base leading-relaxed text-ink/90 sm:text-lg whitespace-pre-line">
                {selectedThought.content}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-6">
              <span className="font-mono text-[11px] text-muted tracking-wider uppercase">
                YASH SRIVASTAVA &middot; JOURNAL ARCHIVE
              </span>
              <button
                type="button"
                onClick={() => setSelectedThought(null)}
                className="px-4 py-2 font-mono text-xs tracking-wider uppercase border border-line text-muted hover:text-ink hover:border-blue transition-colors"
              >
                Close &larr;
              </button>
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
}
