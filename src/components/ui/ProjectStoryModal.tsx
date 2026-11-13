"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useArchive } from "@/components/context/ArchiveProvider";
import { useModalDialog } from "@/components/ui/useModalDialog";
import { PROJECTS } from "@/data/projects";
import { ProjectPlate } from "@/components/ui/ArtworkPlate";

export function ProjectStoryModal() {
  const { selectedProjectSlug, closeProjectModal, openProjectModal } =
    useArchive();

  const dialogRef = useModalDialog({
    isOpen: Boolean(selectedProjectSlug),
    onClose: closeProjectModal,
  });

  const projectIndex = PROJECTS.findIndex(
    (p) => p.slug === selectedProjectSlug
  );
  const project = projectIndex >= 0 ? PROJECTS[projectIndex] : null;
  const nextProject =
    projectIndex >= 0 ? PROJECTS[(projectIndex + 1) % PROJECTS.length] : null;

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="project-modal-title"
      className="m-auto max-h-[90vh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto border border-line bg-paper p-0 text-ink shadow-2xl"
    >
      {project ? (
        <div className="flex flex-col">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line/80 bg-paper/95 px-5 py-4 backdrop-blur-sm md:px-10">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-blue" />
              <span className="font-mono text-xs text-muted">
                {project.number} · {project.year}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href={`/work/${project.slug}`}
                onClick={closeProjectModal}
                className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.12em] text-ink uppercase transition-colors hover:text-blue"
              >
                Open Chapter <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <button
                type="button"
                autoFocus
                onClick={closeProjectModal}
                aria-label="Close project story"
                className="inline-flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-blue"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-10 p-5 md:p-10">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-semibold text-blue">
                  CHAPTER {project.number}
                </span>
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
                {project.slug === "echosentinel" && (
                  <span className="rounded-[2px] bg-ink px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-paper uppercase">
                    SYS://SIGNAL_MONITOR
                  </span>
                )}
                {project.slug === "yojana-saathi" && (
                  <span className="rounded-[2px] border border-blue/60 bg-blue/10 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-blue font-semibold uppercase">
                    VERIFIED CITATION · § 4.2(b)
                  </span>
                )}
                {project.slug === "college-workspace" && (
                  <span className="rounded-[2px] border border-ink/30 bg-paper-soft px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-ink uppercase">
                    STUDIO MEMORY &amp; HANDOFF
                  </span>
                )}
              </div>
              <h2
                id="project-modal-title"
                className="font-display text-3xl font-bold tracking-tight text-ink uppercase md:text-5xl"
              >
                {project.title}
              </h2>
              <p className="max-w-2xl font-sans text-lg leading-relaxed text-ink/90 md:text-xl">
                {project.tagline}
              </p>
              <p className="max-w-2xl font-sans text-sm leading-relaxed text-muted md:text-base">
                {project.summary}
              </p>
              <p className="pt-2 font-mono text-xs text-muted">
                {project.stack.join(" · ")} — {project.role}
              </p>
            </header>

            <div className="min-h-[260px] w-full overflow-hidden border border-line">
              <ProjectPlate
                variant={project.plateVariant}
                title={project.title}
                codeExcerpt={project.codeExcerpt}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-mono text-xs tracking-[0.12em] text-blue uppercase">
                  THE IDEA
                </h3>
                <p className="font-sans text-sm leading-relaxed text-ink/85 md:text-base">
                  {project.story.idea}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-xs tracking-[0.12em] text-blue uppercase">
                  THE PROBLEM
                </h3>
                <p className="font-sans text-sm leading-relaxed text-ink/85 md:text-base">
                  {project.story.problem}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-xs tracking-[0.12em] text-blue uppercase">
                  WHAT I BUILT
                </h3>
                <p className="font-sans text-sm leading-relaxed text-ink/85 md:text-base">
                  {project.story.built}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-xs tracking-[0.12em] text-blue uppercase">
                  WHAT I LEARNED
                </h3>
                <p className="font-sans text-sm leading-relaxed text-ink/85 md:text-base">
                  {project.story.learned}
                </p>
              </div>
            </div>

            <div className="border-t border-line pt-6">
              <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                How the pieces connect
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink">
                {project.story.architectureNodes.map((node, i) => (
                  <React.Fragment key={node}>
                    <span className="bg-paper-soft px-3 py-1.5">{node}</span>
                    {i < project.story.architectureNodes.length - 1 ? (
                      <span aria-hidden="true" className="text-blue">
                        →
                      </span>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <button
                type="button"
                onClick={closeProjectModal}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Back
              </button>
              {nextProject ? (
                <button
                  type="button"
                  onClick={() => openProjectModal(nextProject.slug)}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-blue uppercase transition-opacity hover:opacity-75"
                >
                  Next: {nextProject.title}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
