"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const SPEED = 2.5;
const LINE_LEAD = 0.7;
const FALLBACK_DURATION = 3;
const NUM_POINTS = 71;

// Seeded pseudo-random generator (Mulberry32) for deterministic geometry
function createSeededRandom(seed: number) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Point {
  x: number;
  y: number;
}

export function VideoCutIntro() {
  const [mounted, setMounted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [counterText, setCounterText] = useState("000");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const introLayerRef = useRef<HTMLDivElement | null>(null);
  const videoCardRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const skipBtnRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lineSvgRef = useRef<SVGSVGElement | null>(null);
  const linePathRef = useRef<SVGPathElement | null>(null);
  const tearSvgRef = useRef<SVGSVGElement | null>(null);
  const tearPathRef = useRef<SVGPathElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pointsRef = useRef<Point[]>([]);

  // Generate deterministic 71-point hand-cut jagged line geometry
  const generateLinePoints = useCallback((w: number, h: number): Point[] => {
    const rand = createSeededRandom(42);
    const points: Point[] = [];

    for (let i = 0; i < NUM_POINTS; i++) {
      const x = (i / (NUM_POINTS - 1)) * w;
      // Baseline: y = H * 0.56 - (x / W) * H * 0.14
      const baselineY = h * 0.56 - (x / w) * h * 0.14;
      // Seeded variations: ~±8px large noise, ~±4px fine noise
      const largeNoise = (rand() * 2 - 1) * 8;
      const fineNoise = (rand() * 2 - 1) * 4;
      const y = baselineY + largeNoise + fineNoise;
      points.push({ x, y });
    }

    return points;
  }, []);

  // Construct SVG path for the stroke line
  const buildStrokePath = (points: Point[]): string => {
    if (!points.length) return "";
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`;
    }
    return d;
  };

  // Construct SVG polygon path for the expanding tear (Stage 3)
  const buildTearPath = (points: Point[], thickness: number): string => {
    if (!points.length) return "";
    // Top edge: points shifted upward by thickness
    let d = `M ${points[0].x.toFixed(1)} ${(points[0].y - thickness).toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x.toFixed(1)} ${(points[i].y - thickness).toFixed(1)}`;
    }
    // Bottom edge: points shifted downward by thickness, traversing backwards
    for (let i = points.length - 1; i >= 0; i--) {
      d += ` L ${points[i].x.toFixed(1)} ${(points[i].y + thickness).toFixed(1)}`;
    }
    d += " Z";
    return d;
  };

  // Construct SVG polygon path for upward tear reveal (Stage 5)
  const buildRevealPath = (points: Point[], w: number, h: number, bottomOffset: number): string => {
    if (!points.length) return "";
    // Top edge anchored far above viewport
    let d = `M 0 ${(-h * 0.5).toFixed(1)} L ${w} ${(-h * 0.5).toFixed(1)}`;
    // Bottom edge following the jagged points with vertical offset
    for (let i = points.length - 1; i >= 0; i--) {
      d += ` L ${points[i].x.toFixed(1)} ${(points[i].y + bottomOffset).toFixed(1)}`;
    }
    d += " Z";
    return d;
  };

  // Complete and remove intro
  const finishIntro = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    setShouldPlay(false);
  }, []);

  // Skip handler
  const handleSkip = useCallback(() => {
    finishIntro();
  }, [finishIntro]);

  // Hydration-safe mount & playback check (plays on every refresh unless prefers-reduced-motion is active)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion) {
        setShouldPlay(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while intro is playing
  useEffect(() => {
    if (!mounted || !shouldPlay || typeof document === "undefined") return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, shouldPlay]);

  // Listen for custom replay event (e.g. from command palette)
  useEffect(() => {
    const handleReplay = () => {
      setShouldPlay(true);
    };

    window.addEventListener("ys:replay-intro", handleReplay);
    return () => window.removeEventListener("ys:replay-intro", handleReplay);
  }, []);

  // Master Animation Sequence (Single GSAP timeline, seamless single-pass)
  useEffect(() => {
    if (!mounted || !shouldPlay) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const points = generateLinePoints(w, h);
    pointsRef.current = points;

    // Reset visual state on intro layer and SVG elements
    if (introLayerRef.current) {
      introLayerRef.current.style.display = "flex";
      introLayerRef.current.style.opacity = "1";
    }
    if (videoCardRef.current) {
      videoCardRef.current.style.opacity = "1";
    }
    if (counterRef.current) {
      counterRef.current.style.opacity = "1";
    }
    if (skipBtnRef.current) {
      skipBtnRef.current.style.opacity = "1";
    }

    // Initialize line path
    if (linePathRef.current) {
      const strokeD = buildStrokePath(points);
      linePathRef.current.setAttribute("d", strokeD);
      linePathRef.current.style.strokeDasharray = "1";
      linePathRef.current.style.strokeDashoffset = "1";
    }
    if (lineSvgRef.current) {
      lineSvgRef.current.style.display = "block";
    }

    // Initialize tear path (empty initially)
    if (tearPathRef.current) {
      tearPathRef.current.setAttribute("d", "");
    }
    if (tearSvgRef.current) {
      tearSvgRef.current.style.display = "block";
    }

    const video = videoRef.current;
    if (video) {
      try {
        video.currentTime = 0;
      } catch {}
    }

    const startSequence = () => {
      // Calculate timing based on video metadata or fallback
      let dur = FALLBACK_DURATION;
      if (video && video.duration && !isNaN(video.duration) && video.duration > 0) {
        dur = video.duration / SPEED;
      }
      const tLine = Math.max(0.2, dur - LINE_LEAD);

      // Create ONE master GSAP timeline
      const tl = gsap.timeline({
        onComplete: () => {
          finishIntro();
        },
      });
      timelineRef.current = tl;

      // =====================================================================
      // PHASE 1: Video Playback & Progress Counter (t = 0)
      // =====================================================================
      if (video) {
        video.currentTime = 0;
        video.playbackRate = SPEED;
        video.play().catch(() => {
          // Graceful handling of browser autoplay restrictions
        });
      }

      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: dur,
          ease: "none",
          onUpdate: () => {
            const num = Math.round(counterObj.val);
            setCounterText(String(num).padStart(3, "0"));
          },
        },
        0
      );

      // =====================================================================
      // PHASE 2: Draw Jagged Line across canvas (t = tLine)
      // =====================================================================
      if (linePathRef.current) {
        tl.to(
          linePathRef.current,
          {
            strokeDashoffset: 0,
            duration: LINE_LEAD,
            ease: "power2.inOut",
          },
          tLine
        );
      }

      // =====================================================================
      // PHASE 3: Tear Forms & Intro Content Fades Out (t = dur)
      // Video card, counter, and skip button fade out permanently.
      // =====================================================================
      if (videoCardRef.current) {
        tl.to(
          videoCardRef.current,
          {
            opacity: 0,
            scale: 0.96,
            duration: 0.35,
            ease: "power1.out",
          },
          dur
        );
      }
      if (counterRef.current) {
        tl.to(counterRef.current, { opacity: 0, duration: 0.25, ease: "power1.out" }, dur);
      }
      if (skipBtnRef.current) {
        tl.to(skipBtnRef.current, { opacity: 0, duration: 0.25, ease: "power1.out" }, dur);
      }

      // Tear thickness expansion: 1px -> 9px
      const tearObj = { thickness: 1 };
      tl.to(
        tearObj,
        {
          thickness: 9,
          duration: 0.35,
          ease: "power1.out",
          onUpdate: () => {
            if (tearPathRef.current) {
              const d = buildTearPath(pointsRef.current, tearObj.thickness);
              tearPathRef.current.setAttribute("d", d);
            }
          },
        },
        dur
      );

      // =====================================================================
      // PHASE 4: Full Dark Cover (t = dur + 0.35)
      // Tear expands to cover 100% of the viewport.
      // At full cover, oxblood background and line are permanently hidden.
      // =====================================================================
      const targetFullThickness = h * 1.3;
      tl.to(
        tearObj,
        {
          thickness: targetFullThickness,
          duration: 0.65,
          ease: "power3.in",
          onUpdate: () => {
            if (tearPathRef.current) {
              const d = buildTearPath(pointsRef.current, tearObj.thickness);
              tearPathRef.current.setAttribute("d", d);
            }
          },
        },
        dur + 0.35
      );

      // Point of full viewport black cover:
      const tHold = dur + 1.0;
      tl.add(() => {
        if (video) {
          video.pause();
        }
        // Permanently hide the oxblood background layer and line SVG
        // so that the upcoming upward tear directly reveals the portfolio underneath.
        if (introLayerRef.current) {
          introLayerRef.current.style.display = "none";
        }
        if (lineSvgRef.current) {
          lineSvgRef.current.style.display = "none";
        }
      }, tHold);

      // =====================================================================
      // PHASE 5: Upward Tear Reveal (t = tHold + 0.15)
      // Animate the SAME dark torn layer upward/off-screen to reveal portfolio.
      // =====================================================================
      const tReveal = tHold + 0.15;
      const revealObj = { bottomOffset: h * 1.3 };

      tl.to(
        revealObj,
        {
          bottomOffset: -h * 0.9,
          duration: 0.85,
          ease: "power3.inOut",
          onUpdate: () => {
            if (tearPathRef.current) {
              const d = buildRevealPath(pointsRef.current, w, h, revealObj.bottomOffset);
              tearPathRef.current.setAttribute("d", d);
            }
          },
        },
        tReveal
      );
    };

    // Video metadata check
    if (video) {
      if (video.readyState >= 1) {
        startSequence();
      } else {
        const onLoaded = () => {
          startSequence();
          video.removeEventListener("loadedmetadata", onLoaded);
        };
        video.addEventListener("loadedmetadata", onLoaded);

        const fallbackTimer = setTimeout(() => {
          video.removeEventListener("loadedmetadata", onLoaded);
          if (!timelineRef.current) {
            startSequence();
          }
        }, 800);

        return () => {
          video.removeEventListener("loadedmetadata", onLoaded);
          clearTimeout(fallbackTimer);
          if (timelineRef.current) {
            timelineRef.current.kill();
          }
        };
      }
    } else {
      startSequence();
    }

    // Viewport resize
    const onResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      const newPoints = generateLinePoints(newW, newH);
      pointsRef.current = newPoints;
      if (linePathRef.current) {
        linePathRef.current.setAttribute("d", buildStrokePath(newPoints));
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [mounted, shouldPlay, generateLinePoints, finishIntro]);

  if (!mounted || !shouldPlay) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 select-none overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Opening title sequence"
    >
      {/* LAYER 1: Premium Intro Stage (Oxblood background, contained video, counter, skip button) */}
      <div
        ref={introLayerRef}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-auto"
        style={{
          backgroundColor: "#4A1820",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(74, 24, 32, 0.82) 0%, rgba(32, 9, 14, 0.98) 100%)",
        }}
      >
        {/* Subtle Analog Grain Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
          aria-hidden="true"
        />

        {/* Contained Centered Artwork Card (Fades out permanently in Phase 3) */}
        <div
          ref={videoCardRef}
          className="relative overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.65)] w-[min(70vw,400px)] md:w-[min(52vw,400px)] aspect-[480/330]"
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            aria-label="Yash Srivastava sketch animation"
          />
        </div>

        {/* Progress Counter (Bottom-Left) */}
        <div
          ref={counterRef}
          className="pointer-events-none absolute bottom-7 left-7 sm:bottom-10 sm:left-10 font-mono text-[11px] tracking-[0.3em] text-[#E8C8CD]/80"
          aria-live="polite"
        >
          <span className="font-semibold text-blue mr-1.5">[YS]</span>
          <span>{counterText}</span>
        </div>

        {/* Minimal Skip Button (Bottom-Right) */}
        <button
          ref={skipBtnRef}
          type="button"
          onClick={handleSkip}
          aria-label="Skip intro animation"
          className="absolute bottom-7 right-7 sm:bottom-10 sm:right-10 z-30 font-mono text-[10px] tracking-[0.25em] text-[#E8C8CD]/70 hover:text-white uppercase transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue px-2 py-1"
        >
          SKIP →
        </button>
      </div>

      {/* LAYER 2: Hand-Drawn Jagged Line (SVG Path) */}
      <svg
        ref={lineSvgRef}
        className="pointer-events-none fixed inset-0 z-21 h-full w-full"
        aria-hidden="true"
      >
        <path
          ref={linePathRef}
          fill="none"
          stroke="var(--ink, #121212)"
          strokeWidth="1.6"
          pathLength="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* LAYER 3: Dark Torn Transition Layer (var(--ink)) */}
      <svg
        ref={tearSvgRef}
        className="pointer-events-none fixed inset-0 z-22 h-full w-full"
        aria-hidden="true"
      >
        <path
          ref={tearPathRef}
          fill="var(--ink, #121212)"
        />
      </svg>
    </div>
  );
}
