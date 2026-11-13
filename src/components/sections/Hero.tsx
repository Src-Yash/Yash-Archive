"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useArchive } from "@/components/context/ArchiveProvider";
import { BRAND_CONFIG } from "@/components/ui/BrandIdentity";
import { BlueThread, HandUnderline } from "@/components/ui/SketchMarks";
import { PORTFOLIO_ASSETS } from "@/data/assets";

export function Hero() {
  const { gravityOn, reducedMotion, scrollToSection } = useArchive();
  const accentDetailRef = useRef<HTMLDivElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);

  // Subtle cursor-based parallax on background and blue thread (desktop fine pointer only)
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
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Subtle atmospheric pan on the cinematic background image
      if (bgParallaxRef.current) {
        const bgX = currentX * 10;
        const bgY = currentY * 8;
        bgParallaxRef.current.style.transform = `scale(1.05) translate3d(${bgX.toFixed(2)}px, ${bgY.toFixed(2)}px, 0)`;
      }

      // Subtle drift on the blue thread detail
      if (accentDetailRef.current) {
        accentDetailRef.current.style.transform = `translate3d(${(currentX * 12).toFixed(2)}px, 0, 0)`;
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
      id="arrival"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between overflow-hidden bg-ink pt-4 pb-10 sm:pt-6 sm:pb-12 md:min-h-[calc(100svh-5rem)] md:pt-8 md:pb-14"
    >
      {/* 1. Full-Bleed Cinematic Background Image Layer */}
      <div
        ref={bgParallaxRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
      >
        <Image
          src={PORTFOLIO_ASSETS.heroBackground.src}
          alt={PORTFOLIO_ASSETS.heroBackground.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] filter brightness-[0.82] contrast-[1.12]"
        />

        {/* 2. Readability & Cinematic Treatment: Layered Overlays */}
        {/* Soft dark base overlay preserving night atmosphere */}
        <div className="absolute inset-0 bg-ink/45" />

        {/* Directional horizontal gradient for headline contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />

        {/* Vertical framing gradient bridging navigation and bottom anchor */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/85" />
      </div>

      {/* Top Header Whispers */}
      <div className="editorial-container relative z-10">
        <div className="flex items-center justify-between border-b border-white/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">
              ARCHIVE INDEX · 2026
            </span>
          </div>

          <span className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">
            {BRAND_CONFIG.descriptor}
          </span>
        </div>
      </div>

      {/* Spacious, Confident Editorial Hero Entrance — Opening Title Sequence */}
      <div className="editorial-container relative z-10 my-auto py-12 sm:py-16 md:py-24">
        <div className="max-w-5xl">
          {/* Section Marker */}
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <span className="font-mono text-xs font-semibold text-blue">00</span>
            <span className="font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
              PROLOGUE
            </span>
          </div>

          {/* Primary Statement */}
          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.85rem,8vw,6.85rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-white uppercase"
          >
            <span className="block">I BUILD THINGS</span>
            <span className="mt-1.5 block sm:pl-[4%] md:pl-[6%]">
              THAT LIVE ON
            </span>
            <span className="relative mt-1.5 inline-block">
              THE INTERNET
              <span className="text-blue">.</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 left-0 hidden w-[65%] sm:block"
              >
                <HandUnderline className="h-5 w-full" color="#1D3FFF" />
              </span>
            </span>
          </motion.h1>

          {/* Supporting Copy positioned in generous negative space */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:pl-[4%] md:mt-12 md:grid-cols-12 md:pl-[6%]">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:col-span-8 lg:col-span-7"
            >
              <p className="font-sans text-xl font-normal leading-relaxed text-white/85 sm:text-2xl md:text-2xl lg:text-3xl lg:leading-snug">
                Developer exploring AI, open source,
                <br className="hidden sm:inline" />
                {" "}and the space between code and creativity.
              </p>
            </motion.div>

            {/* Subtle Blue Thread connecting the negative space */}
            <div
              ref={accentDetailRef}
              aria-hidden="true"
              className="hidden items-end justify-end transition-transform will-change-transform md:col-span-4 md:flex lg:col-span-5"
            >
              <BlueThread
                variant="sweep"
                gravityOff={!gravityOn && !reducedMotion}
                className="h-9 w-48 opacity-90"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Anchor */}
      <div className="editorial-container relative z-10">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:gap-6">
          <div className="space-y-0.5">
            <p className="font-display text-sm font-bold tracking-[0.12em] text-white uppercase sm:text-base">
              {BRAND_CONFIG.name}
            </p>
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/60 uppercase">
              {BRAND_CONFIG.descriptor}
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("who-i-am")}
            data-cursor="EXPLORE"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-white uppercase transition-colors hover:text-blue focus-visible:text-blue"
          >
            <span>EXPLORE WHO I AM</span>
            <ArrowDown
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5 text-blue"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
