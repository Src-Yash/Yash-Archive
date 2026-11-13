"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { useArchive } from "@/components/context/ArchiveProvider";
import { HandArrow } from "@/components/ui/SketchMarks";

interface WorldProps {
  project: ProjectItem;
}

export function YojanaSaathiWorld({ project }: WorldProps) {
  const { openProjectModal, reducedMotion } = useArchive();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2px] border border-[#D5CFC3] bg-[#EBE6DC] text-ink shadow-[0_20px_50px_-20px_rgba(30,25,18,0.12)]"
    >
      {/* Top Document Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D5CFC3] bg-[#E3DDCF]/80 px-6 py-3.5 font-mono text-[11px] md:px-10">
        <div className="flex items-center gap-3">
          <FileText className="h-3.5 w-3.5 text-blue" />
          <span className="tracking-[0.16em] text-[#6E685D] uppercase">
            GAZETTE DOSSIER · CITATION RETRIEVAL
          </span>
        </div>

        <div className="flex items-center gap-5 font-mono text-[#6E685D]">
          <span className="hidden sm:inline">CIVIC ACCESS &amp; RAG ENGINE</span>
          <span className="font-semibold text-blue">{project.number} / 03</span>
        </div>
      </div>

      <div className="relative p-6 sm:p-8 md:p-12 lg:p-16">
        {/* Main Title & Concept Spread with Verification Stamp */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-blue">
                CHAPTER {project.number}
              </span>
              <span className="font-mono text-xs text-[#706D67]">
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

            <p className="max-w-xl font-sans text-sm leading-relaxed text-[#5F5A51] md:text-base">
              {project.summary}
            </p>
          </div>

          {/* Stamped Verification Seal — Circular editorial mark */}
          <div className="flex justify-start lg:col-span-4 lg:justify-end">
            <div className="relative rotate-[-4deg] border-2 border-dashed border-blue/80 bg-[#F4F0E6] p-4 text-center font-mono shadow-sm transition-transform hover:rotate-0">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-blue uppercase">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>VERIFIED CITATION</span>
              </div>
              <div className="mt-2 text-[11px] leading-tight text-ink/80">
                Direct Clause Pointer
                <br />
                <span className="text-muted">§ 4.2(b) Gazette 2026</span>
              </div>
              <div className="mt-2 border-t border-line/80 pt-1 text-[9px] tracking-widest text-muted uppercase">
                Zero Hallucination
              </div>
            </div>
          </div>
        </div>

        {/* The Transformation Bridge: Layered Paper Documents */}
        <div className="my-10 border border-[#D5CFC3] bg-[#F2EDE2] p-5 md:my-14 md:p-8">
          <div className="mb-4 flex items-center justify-between border-b border-[#D5CFC3] pb-3 font-mono text-[11px] text-[#706D67] uppercase">
            <span>TRANSFORMATION: DENSE GAZETTE → ACCESSIBLE CITIZEN GUIDANCE</span>
            <span className="text-blue font-semibold">CLAUSE RETRIEVAL</span>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-11">
            {/* Layer 1: Dense Gazette Legalese Paper Sheet */}
            <div className="relative border border-[#D5CFC3] bg-[#FAF7F0] p-6 shadow-sm lg:col-span-5">
              <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                <span>Gazette Circular § 4.2(b)</span>
                <span className="text-[#A43B22] font-semibold">LEGALESE</span>
              </div>
              <p className="mt-4 font-mono text-xs leading-relaxed text-ink/70">
                &ldquo;Subject to sub-clause (ii) of notification 14/2026,
                applicants within income threshold B-1 must furnish domicile
                annexures prior to disbursement under tranche III, failing which
                entitlement shall remain pending review...&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 border-t border-line/60 pt-2 font-mono text-[10px] text-muted italic">
                <span>↳ 40-page PDF barrier</span>
              </div>
            </div>

            {/* Bridge: Hand-drawn arrow */}
            <div className="flex flex-col items-center justify-center lg:col-span-1">
              <HandArrow className="h-8 w-12 rotate-90 lg:rotate-0" color="#1D3FFF" />
              <span className="hidden font-mono text-[9px] text-blue tracking-widest uppercase lg:block">
                PARSE
              </span>
            </div>

            {/* Layer 2: Plain Human Citizen Summary Sheet */}
            <div className="relative border-2 border-ink bg-[#121212] p-6 text-[#F2EFE8] shadow-md lg:col-span-5">
              <div className="flex items-center justify-between border-b border-ink/40 pb-2 font-mono text-[10px] tracking-[0.14em] text-[#9EA4B0] uppercase">
                <span>Citizen Summary</span>
                <span className="text-blue font-semibold">PLAIN LANGUAGE</span>
              </div>
              <ol className="mt-4 space-y-2.5 font-sans text-sm leading-snug">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue font-bold">01.</span>
                  <span>You qualify if your household income is under the state tier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue font-bold">02.</span>
                  <span>Bring Aadhaar card + local residency certificate.</span>
                </li>
                <li className="flex items-start gap-2 text-blue font-medium">
                  <span className="font-mono font-bold">03.</span>
                  <span>Directly anchored to Clause 4.2(b) without ambiguity.</span>
                </li>
              </ol>
              <div className="mt-4 border-t border-ink/40 pt-2 font-mono text-[10px] text-[#9EA4B0]">
                Verified against Official Gazette Tranche III
              </div>
            </div>
          </div>
        </div>

        {/* 4-Beat Narrative in Dossier Style */}
        <div className="grid grid-cols-1 gap-6 border-t border-[#D5CFC3] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 border-l-2 border-blue pl-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-blue uppercase font-bold">
              THE IDEA
            </span>
            <p className="font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
              {project.story.idea}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#BDB6A8] pl-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#6E685D] uppercase font-bold">
              THE PROBLEM
            </span>
            <p className="font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
              {project.story.problem}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#BDB6A8] pl-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#6E685D] uppercase font-bold">
              WHAT I BUILT
            </span>
            <p className="font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
              {project.story.built}
            </p>
          </div>

          <div className="space-y-2 border-l border-[#BDB6A8] pl-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#6E685D] uppercase font-bold">
              WHAT I LEARNED
            </span>
            <p className="font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
              {project.story.learned}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#D5CFC3] pt-6">
          <div className="font-mono text-xs text-[#6E685D]">
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
              className="inline-flex items-center gap-1 font-mono text-xs text-[#6E685D] underline decoration-[#BDB6A8] underline-offset-4 transition-colors hover:text-blue hover:decoration-blue"
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
