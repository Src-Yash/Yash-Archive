"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useArchive } from "@/components/context/ArchiveProvider";
import { ListeningChapter } from "./mind/ListeningChapter";
import { WatchingChapter } from "./mind/WatchingChapter";
import { ThoughtsChapter } from "./mind/ThoughtsChapter";

export function Mind() {
  const { mindPortal, reducedMotion } = useArchive();
  const initialMountRef = useRef(false);

  // When external controls (such as AntigravityConstellation) set mindPortal,
  // smoothly scroll the user to the corresponding chapter.
  useEffect(() => {
    if (!initialMountRef.current) {
      initialMountRef.current = true;
      return;
    }

    const chapterIdMap: Record<string, string> = {
      listening: "mind-listening",
      watching: "mind-watching",
      thinking: "mind-thoughts",
    };

    const targetId = chapterIdMap[mindPortal];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    }
  }, [mindPortal, reducedMotion]);

  const scrollToChapter = (chapterId: string) => {
    const el = document.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="mind"
      className="border-t border-line py-28 md:py-40 lg:py-48"
    >
      <div className="editorial-container">
        {/* Section 06 / MIND Editorial Opening */}
        <div className="mb-20 grid grid-cols-1 items-end gap-8 md:mb-28 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-4 font-mono text-xs text-muted">
              <span className="mr-3 font-semibold text-blue">06</span>
              / MIND
            </p>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5.4rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink uppercase">
              WHAT OCCUPIES THE SPACE
              <br />
              BETWEEN WHAT I DO
              <br />
              AND WHO I AM<span className="text-blue">.</span>
            </h2>
          </div>

          <div className="space-y-6 md:col-span-4 md:col-start-9">
            <p className="font-sans text-base leading-relaxed text-muted md:text-lg">
              Not another project gallery. A three-chapter personal archive of the music, cinema, and private notebook reflections that ground my thinking.
            </p>

            {/* Quick Chapter Navigation Pill Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollToChapter("mind-listening")}
                className="group inline-flex items-center gap-1.5 border border-line bg-paper px-3 py-1.5 font-mono text-xs tracking-wider uppercase text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <span>01 Listening</span>
                <ArrowDown className="h-3 w-3 text-muted group-hover:text-blue transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollToChapter("mind-watching")}
                className="group inline-flex items-center gap-1.5 border border-line bg-paper px-3 py-1.5 font-mono text-xs tracking-wider uppercase text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <span>02 Watching</span>
                <ArrowDown className="h-3 w-3 text-muted group-hover:text-blue transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollToChapter("mind-thoughts")}
                className="group inline-flex items-center gap-1.5 border border-line bg-paper px-3 py-1.5 font-mono text-xs tracking-wider uppercase text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <span>03 Thoughts</span>
                <ArrowDown className="h-3 w-3 text-muted group-hover:text-blue transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* The Three Experiential Chapters */}
        <div className="space-y-20 md:space-y-28 lg:space-y-36">
          {/* Chapter 01: LISTENING */}
          <div className="space-y-4">
            <ListeningChapter />
          </div>

          {/* Chapter Transition 01 → 02 */}
          <div
            aria-hidden="true"
            className="flex items-center justify-between border-t border-line/60 pt-6 font-mono text-[11px] tracking-[0.16em] text-muted uppercase"
          >
            <span>Progression: What I return to &rarr; What I watch &amp; remember</span>
            <button
              type="button"
              onClick={() => scrollToChapter("mind-watching")}
              className="hover:text-blue transition-colors flex items-center gap-1"
            >
              <span>Scroll to Watching</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Chapter 02: WATCHING */}
          <div className="space-y-4">
            <WatchingChapter />
          </div>

          {/* Chapter Transition 02 → 03 */}
          <div
            aria-hidden="true"
            className="flex items-center justify-between border-t border-line/60 pt-6 font-mono text-[11px] tracking-[0.16em] text-muted uppercase"
          >
            <span>Progression: Stories that stayed &rarr; What remains after everything else</span>
            <button
              type="button"
              onClick={() => scrollToChapter("mind-thoughts")}
              className="hover:text-blue transition-colors flex items-center gap-1"
            >
              <span>Scroll to Thoughts</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Chapter 03: THOUGHTS */}
          <div className="space-y-4">
            <ThoughtsChapter />
          </div>
        </div>
      </div>
    </section>
  );
}
