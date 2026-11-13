import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { ProjectPlate } from "@/components/ui/ArtworkPlate";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Chapter Not Found | Yash Srivastava" };
  }
  return {
    title: `${project.number} · ${project.title} | Yash Srivastava`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    notFound();
  }

  const project = PROJECTS[idx];
  const nextProject = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <article className="py-12 md:py-20">
      <div className="editorial-container">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Selected Work
          </Link>
          <span className="font-mono text-xs text-blue">
            {project.number} · {project.year}
          </span>
        </div>

        <header className="grid grid-cols-4 gap-8 pb-12 md:grid-cols-12 md:pb-16">
          <div className="col-span-4 space-y-6 md:col-span-8">
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
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-bold tracking-[-0.035em] text-ink uppercase">
              {project.title}
            </h1>
            <p className="max-w-2xl font-sans text-xl leading-relaxed text-ink/90 md:text-2xl">
              {project.tagline}
            </p>
            <p className="max-w-2xl font-sans text-base leading-relaxed text-muted">
              {project.summary}
            </p>
          </div>

          <div className="col-span-4 flex flex-col justify-between gap-6 border-t border-line pt-6 md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <div className="space-y-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  Role
                </p>
                <p className="mt-1 font-sans text-sm text-ink">{project.role}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  Stack
                </p>
                <p className="mt-1 font-mono text-xs text-ink">
                  {project.stack.join(" · ")}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  Note
                </p>
                <p className="mt-1 font-sans text-sm italic text-blue">
                  {project.marginAnnotation}
                </p>
              </div>
            </div>

            {project.links.github || project.links.live ? (
              <div className="flex flex-wrap gap-4 border-t border-line pt-4">
                {project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.12em] text-ink uppercase underline decoration-blue underline-offset-4 hover:text-blue"
                  >
                    Repository
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null}
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.12em] text-ink uppercase underline decoration-blue underline-offset-4 hover:text-blue"
                  >
                    Live
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        <div className="mb-16 min-h-[300px] w-full overflow-hidden border border-line">
          <ProjectPlate
            variant={project.plateVariant}
            title={project.title}
            codeExcerpt={project.codeExcerpt}
          />
        </div>

        <section className="grid grid-cols-4 gap-10 border-t border-line py-12 md:grid-cols-12 md:py-16">
          <div className="col-span-4 space-y-2 md:col-span-6">
            <h2 className="font-mono text-xs tracking-[0.14em] text-blue uppercase">
              01 · THE IDEA
            </h2>
            <p className="font-sans text-base leading-relaxed text-ink/85 md:text-lg">
              {project.story.idea}
            </p>
          </div>
          <div className="col-span-4 space-y-2 md:col-span-6">
            <h2 className="font-mono text-xs tracking-[0.14em] text-blue uppercase">
              02 · THE PROBLEM
            </h2>
            <p className="font-sans text-base leading-relaxed text-ink/85 md:text-lg">
              {project.story.problem}
            </p>
          </div>
          <div className="col-span-4 space-y-2 md:col-span-6">
            <h2 className="font-mono text-xs tracking-[0.14em] text-blue uppercase">
              03 · WHAT I BUILT
            </h2>
            <p className="font-sans text-base leading-relaxed text-ink/85 md:text-lg">
              {project.story.built}
            </p>
          </div>
          <div className="col-span-4 space-y-2 md:col-span-6">
            <h2 className="font-mono text-xs tracking-[0.14em] text-blue uppercase">
              04 · WHAT I LEARNED
            </h2>
            <p className="font-sans text-base leading-relaxed text-ink/85 md:text-lg">
              {project.story.learned}
            </p>
          </div>
        </section>

        <section className="border-t border-line py-10">
          <h2 className="mb-4 font-mono text-xs tracking-[0.14em] text-muted uppercase">
            How the pieces connect
          </h2>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink">
            {project.story.architectureNodes.map((node, i) => (
              <React.Fragment key={node}>
                <span className="bg-paper-soft px-4 py-2">{node}</span>
                {i < project.story.architectureNodes.length - 1 ? (
                  <span aria-hidden="true" className="text-blue">
                    →
                  </span>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All Chapters
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:text-blue md:text-2xl"
          >
            <span>
              Next: {nextProject.number} — {nextProject.title}
            </span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
