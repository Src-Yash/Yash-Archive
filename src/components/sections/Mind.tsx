"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import {
  MOVIES,
  QUIET_PLAYLISTS,
  THOUGHTS,
  TRACKS,
} from "@/data/mind";
import { MindPortal, useArchive } from "@/components/context/ArchiveProvider";

const PORTALS: { id: MindPortal; label: string }[] = [
  { id: "listening", label: "LISTENING" },
  { id: "watching", label: "WATCHING" },
  { id: "thinking", label: "THINKING" },
];

export function Mind() {
  const {
    mindPortal,
    setMindPortal,
    activeThoughtIndex,
    setActiveThoughtIndex,
    reducedMotion,
  } = useArchive();

  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(24);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.55));
    }, 320);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const currentTrack = TRACKS[activeTrackIdx];
  const currentThought = THOUGHTS[activeThoughtIndex] ?? THOUGHTS[0];

  const cycleThought = (dir: 1 | -1) => {
    setActiveThoughtIndex(
      (activeThoughtIndex + dir + THOUGHTS.length) % THOUGHTS.length
    );
  };

  return (
    <section
      id="mind"
      className="border-t border-line py-32 md:py-44 lg:py-52"
    >
      <div className="editorial-container">
        {/* Quiet Notebook Opening */}
        <div className="mb-20 grid grid-cols-4 gap-8 md:mb-28 md:grid-cols-12">
          <div className="col-span-4 md:col-span-9">
            <p className="mb-5 font-mono text-xs text-muted">
              <span className="mr-3 text-blue">07</span>
              /MIND
            </p>
            <h2 className="font-display text-[clamp(2.25rem,5.6vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.035em] text-ink uppercase">
              SOME THINGS
              <br />
              CAN&apos;T BE PUT
              <br />
              ON A RESUME.
            </h2>
          </div>
        </div>

        {/* Quiet Tab Switcher */}
        <div
          role="tablist"
          aria-label="Personal notebook sections"
          className="mb-16 flex flex-wrap gap-8 border-b border-line pb-5 md:mb-20 md:gap-12"
        >
          {PORTALS.map((portal) => {
            const active = mindPortal === portal.id;
            return (
              <button
                key={portal.id}
                role="tab"
                id={`tab-${portal.id}`}
                aria-selected={active}
                aria-controls={`panel-${portal.id}`}
                type="button"
                onClick={() => setMindPortal(portal.id)}
                data-cursor="OPEN"
                className={`pb-2 font-display text-lg font-semibold tracking-tight transition-colors md:text-2xl ${
                  active
                    ? "border-b-2 border-blue text-ink"
                    : "border-b-2 border-transparent text-muted hover:text-ink"
                }`}
              >
                {portal.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* LISTENING — Minimal liner notes, no SaaS player box */}
          {mindPortal === "listening" ? (
            <motion.div
              key="listening"
              role="tabpanel"
              id="panel-listening"
              aria-labelledby="tab-listening"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-4 gap-12 md:grid-cols-12 md:gap-16"
            >
              <div className="col-span-4 space-y-8 md:col-span-6">
                <div className="space-y-3">
                  <p className="font-mono text-[11px] text-blue">
                    {isPlaying ? "playing quietly" : "on repeat"} ·{" "}
                    {currentTrack.album}
                  </p>
                  <h3 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
                    {currentTrack.title}
                  </h3>
                  <p className="font-sans text-lg text-muted">
                    {currentTrack.artist}
                  </p>
                </div>

                <div className="space-y-2 border-l-2 border-blue pl-5">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-blue uppercase">
                    WHY THIS STAYED WITH ME →
                  </p>
                  <p className="max-w-md font-sans text-base leading-relaxed text-ink/85">
                    {currentTrack.whyItStayed}
                  </p>
                </div>

                {/* Hairline Scrubber */}
                <div className="max-w-md space-y-3 pt-2">
                  <div className="h-[2px] w-full bg-line">
                    <div
                      className="h-full bg-blue transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((prev) => !prev)}
                      data-cursor="PLAY"
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:text-blue"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" aria-hidden="true" />
                          Play
                        </>
                      )}
                    </button>
                    <span className="font-mono text-xs text-muted">
                      {currentTrack.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-4 space-y-12 md:col-span-5 md:col-start-8">
                <div>
                  <p className="mb-4 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                    Records beside the desk
                  </p>
                  <ul className="divide-y divide-line">
                    {TRACKS.map((track, idx) => {
                      const active = idx === activeTrackIdx;
                      return (
                        <li key={track.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTrackIdx(idx);
                              setProgress(12);
                            }}
                            data-cursor="PLAY"
                            className="flex w-full items-baseline justify-between py-4 text-left transition-colors"
                          >
                            <div>
                              <span
                                className={`font-display text-lg font-semibold ${
                                  active
                                    ? "text-blue"
                                    : "text-ink hover:text-blue"
                                }`}
                              >
                                {track.title}
                              </span>
                              <span className="ml-3 font-sans text-sm text-muted">
                                {track.artist}
                              </span>
                            </div>
                            <span className="font-mono text-xs text-muted">
                              {track.duration}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="space-y-3">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                    Playlists I actually work to
                  </p>
                  <ul className="space-y-2 font-sans text-sm leading-relaxed text-ink/85">
                    {QUIET_PLAYLISTS.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : null}

          {/* WATCHING — Personal film memories, no ratings */}
          {mindPortal === "watching" ? (
            <motion.div
              key="watching"
              role="tabpanel"
              id="panel-watching"
              aria-labelledby="tab-watching"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="space-y-16"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink uppercase md:text-3xl">
                THE MOVIES I STILL THINK ABOUT.
              </h3>

              <div className="space-y-14">
                {MOVIES.map((movie) => (
                  <article
                    key={movie.id}
                    className="group grid grid-cols-4 items-center gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-10"
                  >
                    <div className="col-span-4 md:col-span-6">
                      <div
                        className="aspect-[21/9] w-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                        style={{
                          background: `linear-gradient(120deg, ${movie.palette[0]}, ${movie.palette[1]})`,
                        }}
                      >
                        <div className="flex h-full flex-col justify-between p-5 text-[#F2EFE8]">
                          <span className="font-mono text-[10px] opacity-70">
                            {movie.ratio}
                          </span>
                          <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                            {movie.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-4 space-y-3 md:col-span-5 md:col-start-8">
                      <p className="font-mono text-xs text-muted">
                        {movie.director} · {movie.year}
                      </p>
                      <p className="font-mono text-[11px] tracking-[0.12em] text-blue uppercase">
                        WHY THIS STAYED WITH ME →
                      </p>
                      <p className="font-sans text-base leading-relaxed text-ink/85">
                        {movie.whyItStayed}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ) : null}

          {/* THINKING — Pure whitespace & typography, zero cards */}
          {mindPortal === "thinking" ? (
            <motion.div
              key="thinking"
              role="tabpanel"
              id="panel-thinking"
              aria-labelledby="tab-thinking"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="py-6 md:py-14"
            >
              <div className="grid grid-cols-4 gap-8 md:grid-cols-12">
                <div className="col-span-4 space-y-12 md:col-span-9 md:col-start-2">
                  <p className="font-mono text-xs tracking-[0.14em] text-blue uppercase">
                    {currentThought.prompt}
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={currentThought.id}
                      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3"
                    >
                      {currentThought.lines.map((line) => (
                        <p
                          key={line}
                          className="font-display text-[clamp(1.75rem,4vw,3.4rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-ink"
                        >
                          {line}
                        </p>
                      ))}
                      <footer className="pt-8 font-sans text-sm italic text-muted">
                        — {currentThought.marginNote}
                      </footer>
                    </motion.blockquote>
                  </AnimatePresence>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
                    <div className="flex items-center gap-8">
                      <button
                        type="button"
                        onClick={() => cycleThought(-1)}
                        data-cursor="READ"
                        className="font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-ink"
                      >
                        ← Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => cycleThought(1)}
                        data-cursor="READ"
                        className="font-mono text-xs tracking-[0.12em] text-blue uppercase transition-opacity hover:opacity-75"
                      >
                        Turn page →
                      </button>
                    </div>

                    <span className="font-mono text-[11px] text-muted">
                      {activeThoughtIndex + 1} / {THOUGHTS.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
