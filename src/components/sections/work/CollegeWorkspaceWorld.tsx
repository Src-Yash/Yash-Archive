"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Pin, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { useArchive } from "@/components/context/ArchiveProvider";
import { BlueThread } from "@/components/ui/SketchMarks";

interface WorldProps {
  project: ProjectItem;
}

export function CollegeWorkspaceWorld({ project }: WorldProps) {
  const { openProjectModal, gravityOn, reducedMotion } = useArchive();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const studioNotes = [
    {
      id: "rooms",
      title: "STUDIO ROOMS",
      tag: "SPATIAL SPECS",
      rotation: "rotate-[-2deg]",
      hoverRotation: "hover:rotate-0",
      content:
        "Replacing fragmented group chats with dedicated mission rooms—keeping designs, specs, and decisions anchored together.",
      accent: "border-ink",
    },
    {
      id: "handoff",
      title: "SEMESTER HANDOFF",
      tag: "ZERO CONTEXT LOSS",
      rotation: "rotate-[2deg]",
      hoverRotation: "hover:rotate-0",
      content:
        "Knowledge shouldn't graduate with seniors. Handoff ledgers pass institutional context directly to upcoming coordinators.",
      accent: "border-blue",
    },
    {
      id: "archive",
      title: "COHORT MEMORY",
      tag: "LIVING SHELF",
      rotation: "rotate-[-1deg]",
      hoverRotation: "hover:rotate-0",
      content:
        "A living archive of postmortems, sponsor decks, and real mistakes—turning each year's lessons into collective muscle.",
      accent: "border-ink",
    },
  ];

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2px] border border-[#CDC5B6] bg-[#E5DFD2] text-ink shadow-[0_20px_50px_-20px_rgba(25,20,15,0.12)]"
    >
      {/* Top Studio Board Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CDC5B6] bg-[#DDD6C8]/80 px-6 py-3.5 font-mono text-[11px] md:px-10">
        <div className="flex items-center gap-3">
          <Users2 className="h-3.5 w-3.5 text-blue" />
          <span className="tracking-[0.16em] text-[#696357] uppercase">
            STUDIO WALL // COLLABORATIVE REPOSITORY
          </span>
        </div>

        <div className="flex items-center gap-5 font-mono text-[#696357]">
          <span className="hidden sm:inline">CAMPUS COHORT MEMORY</span>
          <span className="font-semibold text-blue">{project.number} / 03</span>
        </div>
      </div>

      <div className="relative p-6 sm:p-8 md:p-12 lg:p-16">
        {/* Main Title & Concept Spread */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-blue">
                CHAPTER {project.number}
              </span>
              <span className="font-mono text-xs text-[#696357]">
                {project.year}
              </span>
            </div>

            <h3 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink uppercase sm:text-4xl md:text-5xl lg:text-6xl">
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

            <p className="max-w-xl font-sans text-lg font-medium leading-relaxed text-ink/90 md:text-xl">
              {project.tagline}
            </p>

            <p className="max-w-xl font-sans text-sm leading-relaxed text-[#595348] md:text-base">
              {project.summary}
            </p>
          </div>

          <div className="hidden items-center justify-end lg:col-span-4 lg:flex">
            <div className="space-y-2 border-l border-line/90 pl-5 font-mono text-xs text-muted">
              <p className="text-ink font-semibold">STUDIO ETHOS</p>
              <p className="italic">
                &ldquo;Built so context doesn&apos;t graduate when seniors leave.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* The Studio Wall: Intentionally organic pinned notes connected by thread */}
        <div className="relative my-10 border border-[#CDC5B6] bg-[#EDE8DC] p-6 sm:p-8 md:my-14 md:p-10">
          <div className="mb-8 flex items-center justify-between border-b border-[#CDC5B6] pb-3 font-mono text-[11px] text-[#696357] uppercase">
            <span>STUDIO BOARD: ASSEMBLED THINKING &amp; HANDOFF RITUALS</span>
            <span className="text-blue font-semibold">SHARED MEMORY</span>
          </div>

          {/* Blue Thread connecting the pinned cards */}
          <div aria-hidden="true" className="pointer-events-none absolute top-12 left-10 right-10 hidden md:block">
            <BlueThread
              variant="loop"
              gravityOff={!gravityOn && !reducedMotion}
              className="h-12 w-full opacity-70"
            />
          </div>

          {/* Three Pinned Studio Cards */}
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
            {studioNotes.map((note, idx) => (
              <div
                key={note.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative border bg-[#F8F5EE] p-6 shadow-sm transition-all duration-300 ${note.rotation} ${note.hoverRotation} ${
                  hoveredCard === idx
                    ? "border-blue -translate-y-1.5 shadow-md"
                    : `${note.accent} shadow-sm`
                }`}
              >
                {/* Pushpin detail */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue shadow-sm" />
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  <span>0{idx + 1}</span>
                  <span className={idx === 1 ? "text-blue font-semibold" : "text-ink/60"}>
                    {note.tag}
                  </span>
                </div>

                <h4 className="mt-3 font-display text-lg font-bold tracking-tight text-ink uppercase">
                  {note.title}
                </h4>

                <p className="mt-2.5 font-sans text-xs leading-relaxed text-ink/75 sm:text-sm">
                  {note.content}
                </p>

                <div className="mt-4 border-t border-line/60 pt-2 flex items-center gap-1 font-mono text-[9px] text-muted">
                  <Pin className="h-3 w-3 text-blue" />
                  <span>PINNED TO WALL</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Beat Narrative in Studio Ledger Style */}
        <div className="grid grid-cols-1 gap-6 border-t border-[#CDC5B6] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 border-l-2 border-blue pl-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-blue uppercase font-bold">
              THE IDEA
            </span>
            <p className="font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
              {project.story.idea}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#B5ADA0] pl-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#696357] uppercase font-bold">
              THE PROBLEM
            </span>
            <p className="font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
              {project.story.problem}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#B5ADA0] pl-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#696357] uppercase font-bold">
              WHAT I BUILT
            </span>
            <p className="font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
              {project.story.built}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#B5ADA0] pl-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#696357] uppercase font-bold">
              WHAT I LEARNED
            </span>
            <p className="font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
              {project.story.learned}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#CDC5B6] pt-6">
          <div className="font-mono text-xs text-[#696357]">
            {project.stack.join(" · ")}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => openProjectModal(project.slug)}
              data-cursor="STORY"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:text-blue"
            >
              <span>VIEW FULL STORY</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue" aria-hidden="true" />
            </button>

            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1 font-mono text-xs text-[#696357] underline decoration-[#B5ADA0] underline-offset-4 transition-colors hover:text-blue hover:decoration-blue"
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
