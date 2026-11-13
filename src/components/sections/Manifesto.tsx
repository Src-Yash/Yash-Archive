"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useArchive } from "@/components/context/ArchiveProvider";
import { HandStrike } from "@/components/ui/SketchMarks";
import { PORTFOLIO_ASSETS } from "@/data/assets";

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useArchive();

  // GSAP scroll trigger for text reveal
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".who-headline-line", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".who-body-block", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".who-body-block",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".who-portrait-plate", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".who-portrait-plate",
          start: "top 80%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Subtle cursor-based parallax on the editorial portrait photograph (desktop fine pointer only)
  useEffect(() => {
    if (reducedMotion) return;

    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mqFine.matches) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (portraitFrameRef.current) {
        portraitFrameRef.current.style.transform = `translate3d(${(currentX * 8).toFixed(2)}px, ${(currentY * 6).toFixed(2)}px, 0)`;
      }

      if (portraitImgRef.current) {
        portraitImgRef.current.style.transform = `scale(1.03) translate3d(${(-currentX * 4).toFixed(2)}px, ${(-currentY * 3).toFixed(2)}px, 0)`;
      }

      rafId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      id="who-i-am"
      className="relative overflow-hidden border-t border-line py-28 md:py-36 lg:py-48"
    >
      {/* Oversized editorial word interacting with the edges of the viewport */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-[-3vw] xl:right-[-1vw] font-display text-[clamp(5.5rem,20vw,17rem)] font-black leading-none tracking-[-0.05em] text-ink/[0.035] uppercase select-none"
      >
        CURIOUS
      </div>

      <div className="editorial-container relative z-10">
        {/* Section Index Marker */}
        <div className="mb-10 flex items-baseline gap-4 md:mb-14">
          <span className="font-mono text-xs font-semibold text-blue">01</span>
          <span className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            WHO I AM
          </span>
        </div>

        {/* 12-Column Editorial Spread */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Monumental Headline & Multi-disciplinary Narrative */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Monumental Editorial Headline */}
            <h2 className="font-display text-[clamp(2.5rem,6.8vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink uppercase">
              <span className="who-headline-line block">ALWAYS</span>
              <span className="who-headline-line mt-2 block sm:pl-[4%] md:pl-[6%]">
                <span className="relative inline-block text-muted/60">
                  BUSY
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[-10%] top-1/2 -translate-y-1/2"
                  >
                    <HandStrike className="h-7 w-full" color="#1D3FFF" />
                  </span>
                </span>{" "}
                <span className="text-blue">CURIOUS.</span>
              </span>
            </h2>

            {/* Generous Asymmetrical Narrative Space — The Person Behind the Work */}
            <div className="who-body-block mt-8 sm:pl-[4%] md:mt-12 md:pl-[6%]">
              {/* Opening declaration */}
              <p className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                I write code.
              </p>

              {/* Movement & feeling */}
              <p className="mt-6 font-sans text-xl font-normal leading-relaxed text-ink/85 sm:text-2xl md:text-2xl lg:text-3xl lg:leading-snug">
                But I am also interested in how things look,
                <br className="hidden sm:inline" />
                {" "}move, sound, and make people feel.
              </p>

              {/* Disciplines Constellation — Poetic rhythm, not a résumé tag cloud */}
              <div className="my-10 border-y border-line/75 py-8 md:my-12 md:py-9">
                <p className="font-display text-xl font-bold tracking-[0.03em] text-ink uppercase sm:text-2xl md:text-3xl">
                  <span>Web development.</span>{" "}
                  <span className="text-muted/70">AI.</span>{" "}
                  <span>Open source.</span>
                </p>
                <p className="mt-2 font-display text-xl font-bold tracking-[0.03em] text-ink uppercase sm:text-2xl md:text-3xl">
                  <span>Editing.</span>{" "}
                  <span className="text-muted/70">Art.</span>{" "}
                  <span>Films.</span>{" "}
                  <span className="text-blue">Music.</span>
                </p>
              </div>

              {/* Quiet human closing reflection */}
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
                <p className="font-display text-lg font-medium tracking-tight text-ink sm:text-xl md:text-2xl">
                  Still exploring.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Personal Moment — Side-Facing Night Portrait */}
          <div className="who-portrait-plate flex justify-center lg:col-span-5 lg:justify-end xl:col-span-5">
            <div
              ref={portraitFrameRef}
              className="relative w-full max-w-[320px] will-change-transform sm:max-w-[360px] md:max-w-[380px] lg:max-w-[400px]"
            >
              {/* Archival Datum Marker */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-2.5 -left-2.5 z-20 flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 bg-blue" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-blue uppercase">
                  {PORTFOLIO_ASSETS.portraitSide.plate}
                </span>
              </div>

              {/* Tall Architectural Editorial Crop */}
              <div className="relative aspect-[3/4.3] w-full overflow-hidden border border-line/90 bg-ink shadow-[0_24px_48px_-20px_rgba(18,18,18,0.18)]">
                <div
                  ref={portraitImgRef}
                  className="relative h-full w-full will-change-transform"
                >
                  <Image
                    src={PORTFOLIO_ASSETS.portraitSide.src}
                    alt={PORTFOLIO_ASSETS.portraitSide.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                    className="object-cover object-[center_20%] filter contrast-[1.04]"
                  />

                  {/* Cinematic night atmosphere vignette */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/20 mix-blend-multiply"
                  />

                  {/* Corner archival signature */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 bottom-3 z-10 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-paper/70 uppercase"
                  >
                    <span>YASH SRIVASTAVA</span>
                    <span className="text-blue">·</span>
                    <span>2026</span>
                  </div>
                </div>
              </div>

              {/* Minimal Archival Caption Strip */}
              <div className="mt-2.5 flex items-center justify-between px-0.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                <span>{PORTFOLIO_ASSETS.portraitSide.caption}</span>
                <span className="font-bold text-ink">
                  YS<span className="text-blue">.</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
