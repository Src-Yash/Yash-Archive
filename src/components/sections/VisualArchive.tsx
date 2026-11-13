"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  X,
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Film,
  Grid3X3,
  Boxes,
} from "lucide-react";
import { VISUAL_ARCHIVE_ITEMS, type MediaItem } from "@/data/mediaArchive";
import { useArchive } from "@/components/context/ArchiveProvider";

type ViewMode = "spatial" | "index";

export function VisualArchive() {
  const { reducedMotion } = useArchive();
  const [viewMode, setViewMode] = useState<ViewMode>("spatial");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const triggerButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  // GSAP quickTo setters for smooth mouse parallax
  const rotateXTo = useRef<gsap.QuickToFunc | null>(null);
  const rotateYTo = useRef<gsap.QuickToFunc | null>(null);
  const translateZTo = useRef<gsap.QuickToFunc | null>(null);

  // Filter images for lightbox keyboard navigation
  const imageItems = VISUAL_ARCHIVE_ITEMS.filter((item) => item.type === "image");
  const currentImageIndex = imageItems.findIndex((item) => item.id === selectedMedia?.id);

  // Detect touch pointer
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqTouch = window.matchMedia("(hover: none), (pointer: coarse)");
    const timer = setTimeout(() => {
      setIsTouchDevice(mqTouch.matches);
    }, 0);

    const onTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mqTouch.addEventListener("change", onTouchChange);
    return () => {
      clearTimeout(timer);
      mqTouch.removeEventListener("change", onTouchChange);
    };
  }, []);

  // IntersectionObserver to pause work when off-screen
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Pause any preview video
          if (activeVideoRef.current) {
            activeVideoRef.current.pause();
            activeVideoRef.current.currentTime = 0;
            activeVideoRef.current = null;
          }
          setActiveItemId(null);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize GSAP quickTo on the 3D world
  useEffect(() => {
    if (!worldRef.current || isTouchDevice || reducedMotion) return;

    gsap.set(worldRef.current, {
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
    });

    rotateXTo.current = gsap.quickTo(worldRef.current, "rotationX", {
      duration: 1,
      ease: "power3.out",
    });

    rotateYTo.current = gsap.quickTo(worldRef.current, "rotationY", {
      duration: 1,
      ease: "power3.out",
    });

    translateZTo.current = gsap.quickTo(worldRef.current, "z", {
      duration: 1,
      ease: "power2.out",
    });
  }, [isTouchDevice, reducedMotion]);

  // Mouse parallax handler
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isTouchDevice || reducedMotion || viewMode !== "spatial" || !worldRef.current) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rotY = (mouseX / rect.width - 0.5) * 14;
      const rotX = -(mouseY / rect.height - 0.5) * 10;

      rotateYTo.current?.(rotY);
      rotateXTo.current?.(rotX);
    },
    [isTouchDevice, reducedMotion, viewMode]
  );

  // Mouse leave reset
  const handlePointerLeave = useCallback(() => {
    if (isTouchDevice || reducedMotion || !worldRef.current) return;
    rotateYTo.current?.(0);
    rotateXTo.current?.(0);
    setActiveItemId(null);

    if (activeVideoRef.current) {
      activeVideoRef.current.pause();
      activeVideoRef.current.currentTime = 0;
      activeVideoRef.current = null;
    }
  }, [isTouchDevice, reducedMotion]);

  // Natural scroll depth drift (translateZ: -400px -> +400px)
  useEffect(() => {
    if (isTouchDevice || reducedMotion || viewMode !== "spatial" || !isInViewport) return;

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));

      // Drift from -400px to +400px along Z axis
      const targetZ = (progress - 0.5) * 800;
      translateZTo.current?.(targetZ);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTouchDevice, reducedMotion, viewMode, isInViewport]);

  // Handle video hover preview
  const handleTileEnter = (item: MediaItem, videoEl: HTMLVideoElement | null) => {
    setActiveItemId(item.id);

    // Pause previously playing preview
    if (activeVideoRef.current && activeVideoRef.current !== videoEl) {
      activeVideoRef.current.pause();
      activeVideoRef.current.currentTime = 0;
    }

    if (item.type === "video" && videoEl && !reducedMotion) {
      activeVideoRef.current = videoEl;
      videoEl.play().catch(() => {});
    }
  };

  const handleTileLeave = (item: MediaItem, videoEl: HTMLVideoElement | null) => {
    if (item.type === "video" && videoEl) {
      videoEl.pause();
      videoEl.currentTime = 0;
      if (activeVideoRef.current === videoEl) {
        activeVideoRef.current = null;
      }
    }
  };

  // Lock body scroll when lightbox/modal dialog is active
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (selectedMedia) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedMedia]);

  // Open media dialog
  const openMediaDialog = (item: MediaItem) => {
    // Pause any preview
    if (activeVideoRef.current) {
      activeVideoRef.current.pause();
      activeVideoRef.current.currentTime = 0;
      activeVideoRef.current = null;
    }

    setSelectedMedia(item);
  };

  // Close media dialog & restore focus
  const closeMediaDialog = useCallback(() => {
    const originId = selectedMedia?.id;
    setSelectedMedia(null);

    // Restore keyboard focus to the originating tile
    if (originId) {
      requestAnimationFrame(() => {
        triggerButtonRefs.current.get(originId)?.focus();
      });
    }
  }, [selectedMedia]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!selectedMedia) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMediaDialog();
      } else if (selectedMedia.type === "image") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const nextIdx = (currentImageIndex + 1) % imageItems.length;
          setSelectedMedia(imageItems[nextIdx]);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIdx = (currentImageIndex - 1 + imageItems.length) % imageItems.length;
          setSelectedMedia(imageItems[prevIdx]);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedMedia, currentImageIndex, imageItems, closeMediaDialog]);

  // Focus modal close button on open
  useEffect(() => {
    if (selectedMedia) {
      modalCloseBtnRef.current?.focus();
    }
  }, [selectedMedia]);

  // Size helper for spatial widths
  const getTileWidth = (size: "s" | "m" | "l") => {
    switch (size) {
      case "s":
        return 200;
      case "m":
        return 280;
      case "l":
        return 380;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="visual-archive"
      className="relative min-h-screen bg-[#07090E] text-[#F2EFE8] overflow-hidden border-t border-[#161D2C] py-10 sm:py-14 select-none"
      aria-label="05 / Visual Archive"
    >
      {/* Backward-compatible navigation anchors */}
      <div id="create" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <div id="images" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* Atmospheric dark backdrop & subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,63,255,0.04)_0%,transparent_75%)]" />

      {/* =====================================================================
          HEADER & SEGMENTED VIEW CONTROLS
          ===================================================================== */}
      <div className="editorial-container relative z-30 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#182030] pb-5">
          {/* Section Marker & Title */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#7A869E]">
            <span className="font-semibold text-blue">05</span>
            <span className="text-white font-medium tracking-[0.22em] uppercase">
              VISUAL ARCHIVE
            </span>
            <span className="text-[#323D52]">/</span>
            <span className="text-[#8E9BB0] tracking-wider uppercase hidden sm:inline">
              12 ARTIFACTS
            </span>
          </div>

          {/* Segmented View Mode Toggle */}
          <div
            role="tablist"
            aria-label="Archive view mode"
            className="inline-flex items-center rounded-none border border-[#222C40] bg-[#0E131D] p-1 font-mono text-[11px] tracking-wider uppercase"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "spatial"}
              disabled={isTouchDevice}
              onClick={() => setViewMode("spatial")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200 cursor-pointer ${
                viewMode === "spatial"
                  ? "bg-blue text-white shadow-[0_2px_10px_rgba(29,63,255,0.4)] font-medium"
                  : "text-[#7A869E] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              }`}
            >
              <Boxes className="h-3.5 w-3.5" aria-hidden="true" />
              <span>SPATIAL VIEW</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "index"}
              onClick={() => setViewMode("index")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200 cursor-pointer ${
                viewMode === "index"
                  ? "bg-blue text-white shadow-[0_2px_10px_rgba(29,63,255,0.4)] font-medium"
                  : "text-[#7A869E] hover:text-white"
              }`}
            >
              <Grid3X3 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>INDEX VIEW</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN DISPLAY AREA: SPATIAL 3D OR INDEX GRID
          ===================================================================== */}
      {viewMode === "spatial" && !isTouchDevice ? (
        <div
          ref={sceneRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative mx-auto w-full max-w-[1500px] h-[780px] overflow-hidden flex items-center justify-center cursor-default"
          style={{ perspective: 1200 }}
          data-active={activeItemId ? "true" : "false"}
        >
          {/* Subtle 3D Space Depth Calipers */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-8 font-mono text-[9px] text-[#404D66] tracking-[0.25em] uppercase">
            <span>Z:-700 // DEEP PERSPECTIVE</span>
            <span>YASH SRIVASTAVA // SPATIAL ARCHIVE</span>
            <span>Z:000 // FOREGROUND</span>
          </div>

          {/* 3D Rotatable World Container */}
          <div
            ref={worldRef}
            className="relative w-0 h-0 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {VISUAL_ARCHIVE_ITEMS.map((item, index) => {
              const isActive = activeItemId === item.id;
              const isOtherActive = activeItemId !== null && !isActive;
              const baseWidth = getTileWidth(item.size);
              const aspectRatio = item.width / item.height;
              const baseHeight = Math.round(baseWidth / aspectRatio);

              return (
                <div
                  key={item.id}
                  className="absolute top-0 left-0 transition-all duration-600 ease-[cubic-bezier(.2,.8,.2,1)]"
                  style={{
                    width: baseWidth,
                    height: baseHeight,
                    transform: `translate3d(calc(${item.x}px - 50%), calc(${item.y}px - 50%), ${
                      isActive ? item.z + 80 : item.z
                    }px) rotateY(${item.rotateY || 0}deg) rotateZ(${item.rotateZ || 0}deg) scale(${
                      isActive ? 1.08 : 1
                    })`,
                    transformStyle: "preserve-3d",
                    zIndex: isActive ? 50 : Math.round(item.z + 1000),
                    opacity: isActive ? 1 : isOtherActive ? 0.15 : item.z < -400 ? 0.28 : 0.38,
                    filter: isActive
                      ? "brightness(1) contrast(1.05)"
                      : isOtherActive
                      ? "brightness(0.4)"
                      : "brightness(0.65)",
                  }}
                >
                  <TileButton
                    item={item}
                    index={index}
                    isActive={isActive}
                    reducedMotion={reducedMotion}
                    onOpen={() => openMediaDialog(item)}
                    onHoverStart={(videoEl) => handleTileEnter(item, videoEl)}
                    onHoverEnd={(videoEl) => handleTileLeave(item, videoEl)}
                    ref={(el) => {
                      if (el) triggerButtonRefs.current.set(item.id, el);
                      else triggerButtonRefs.current.delete(item.id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ===================================================================
           INDEX VIEW (OR TOUCH / MOBILE / REDUCED-MOTION MODE)
           Clean, responsive 2/3/4 column index using the EXACT SAME data.
           =================================================================== */
        <div className="editorial-container relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {VISUAL_ARCHIVE_ITEMS.map((item, index) => {
              const isVideo = item.type === "video";
              const numStr = String(index + 1).padStart(2, "0");

              return (
                <article
                  key={item.id}
                  className="group relative flex flex-col justify-between border border-[#1A2333] bg-[#0C101A] p-3 sm:p-4 transition-all duration-300 hover:border-blue/60 hover:bg-[#101624] hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                >
                  {/* Media Thumbnail Container */}
                  <button
                    type="button"
                    ref={(el) => {
                      if (el) triggerButtonRefs.current.set(item.id, el);
                      else triggerButtonRefs.current.delete(item.id);
                    }}
                    onClick={() => openMediaDialog(item)}
                    style={{
        transitionDuration: reducedMotion ? "0ms" : undefined,
      }}
      aria-label={`${isVideo ? "Play reel" : "Open frame"}: ${item.title}`}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 border border-[#20293A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue cursor-pointer"
                  >
                    <Image
                      src={isVideo && item.poster ? item.poster : item.src}
                      alt={item.alt || item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Media Type Badge Overlay */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white backdrop-blur-sm uppercase">
                      {isVideo ? (
                        <>
                          <Film className="h-2.5 w-2.5 text-blue" />
                          <span>REEL</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-2.5 w-2.5 text-white/70" />
                          <span>FRAME</span>
                        </>
                      )}
                    </div>

                    {/* Play Icon overlay for video tiles */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-black/30">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white shadow-lg">
                          <Play className="h-4 w-4 ml-0.5" />
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Metadata & Title */}
                  <div className="mt-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#7A869E] uppercase">
                      <span className="font-semibold text-blue">{numStr}</span>
                      <span>{item.category}</span>
                    </div>

                    <h4 className="font-display text-base font-semibold text-white tracking-tight group-hover:text-blue transition-colors">
                      {item.title}
                    </h4>

                    {item.description && (
                      <p className="font-sans text-[11px] leading-relaxed text-[#8B98AD] line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Trigger Button Footer */}
                  <button
                    type="button"
                    onClick={() => openMediaDialog(item)}
                    className="mt-3 flex items-center justify-between border-t border-[#1C2538] pt-2 font-mono text-[10px] tracking-wider text-white/60 group-hover:text-blue uppercase transition-colors cursor-pointer"
                  >
                    <span>{isVideo ? "PLAY REEL" : "OPEN FRAME"}</span>
                    <Maximize2 className="h-3 w-3" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          FULL-FRAME LIGHTBOX / CINEMATIC VIDEO PLAYER OVERLAYS
          ===================================================================== */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4 sm:p-8 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-media-title"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col max-h-[92vh] w-full max-w-5xl border border-[#222E42] bg-[#0A0E17] shadow-2xl overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-[#1C2538] px-4 py-3 sm:px-6 sm:py-4 font-mono text-xs text-[#8A97AC]">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-blue">
                    {String(
                      VISUAL_ARCHIVE_ITEMS.findIndex((i) => i.id === selectedMedia.id) + 1
                    ).padStart(2, "0")}
                  </span>
                  <span className="text-white font-medium uppercase">{selectedMedia.title}</span>
                  <span className="text-[#364257]">/</span>
                  <span className="text-[#728096] uppercase">{selectedMedia.category}</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Left / Right arrow navigation for images */}
                  {selectedMedia.type === "image" && imageItems.length > 1 && (
                    <div className="hidden sm:flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const prevIdx =
                            (currentImageIndex - 1 + imageItems.length) % imageItems.length;
                          setSelectedMedia(imageItems[prevIdx]);
                        }}
                        aria-label="Previous image"
                        className="p-1 text-white/60 hover:text-white transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="font-mono text-[10px] text-white/40">
                        {currentImageIndex + 1} / {imageItems.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const nextIdx = (currentImageIndex + 1) % imageItems.length;
                          setSelectedMedia(imageItems[nextIdx]);
                        }}
                        aria-label="Next image"
                        className="p-1 text-white/60 hover:text-white transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <button
                    ref={modalCloseBtnRef}
                    type="button"
                    onClick={closeMediaDialog}
                    aria-label="Close dialog"
                    className="flex items-center gap-1 text-white/70 hover:text-white hover:text-blue transition-colors cursor-pointer"
                  >
                    <span className="hidden sm:inline font-mono text-[10px] tracking-wider uppercase">
                      CLOSE [ESC]
                    </span>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Modal Media Body */}
              <div className="relative flex-1 min-h-[50vh] max-h-[70vh] w-full flex items-center justify-center bg-black/60 p-2 sm:p-4 overflow-hidden">
                {selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.src}
                    poster={selectedMedia.poster}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[66vh] max-w-full object-contain"
                    aria-label={selectedMedia.title}
                  />
                ) : (
                  <div className="relative h-full w-full max-h-[66vh] flex items-center justify-center">
                    <Image
                      src={selectedMedia.src}
                      alt={selectedMedia.alt || selectedMedia.title}
                      width={selectedMedia.width}
                      height={selectedMedia.height}
                      priority
                      className="max-h-[66vh] w-auto max-w-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Modal Description Footer */}
              {selectedMedia.description && (
                <div className="border-t border-[#1C2538] bg-[#0E131E] px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p className="font-sans text-xs leading-relaxed text-[#B0BCCF]">
                    {selectedMedia.description}
                  </p>
                  <span className="font-mono text-[10px] text-[#55637A] tracking-wider uppercase">
                    YASH SRIVASTAVA ARCHIVE
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Sub-component for individual interactive spatial tile button
 */
interface TileButtonProps {
  item: MediaItem;
  index: number;
  isActive: boolean;
  reducedMotion: boolean;
  onOpen: () => void;
  onHoverStart: (videoEl: HTMLVideoElement | null) => void;
  onHoverEnd: (videoEl: HTMLVideoElement | null) => void;
  ref: (el: HTMLButtonElement | null) => void;
}

function TileButton({
  item,
  index,
  isActive,
  reducedMotion,
  onOpen,
  onHoverStart,
  onHoverEnd,
  ref,
}: TileButtonProps) {
  const isVideo = item.type === "video";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onPointerEnter={() => onHoverStart(videoRef.current)}
      onPointerLeave={() => onHoverEnd(videoRef.current)}
      onFocus={() => onHoverStart(videoRef.current)}
      onBlur={() => onHoverEnd(videoRef.current)}
      style={{
        transitionDuration: reducedMotion ? "0ms" : undefined,
      }}
      aria-label={`${isVideo ? "Play reel" : "Open frame"}: ${item.title}`}
      className={`group relative h-full w-full overflow-hidden border bg-black/60 shadow-[0_16px_40px_rgba(0,0,0,0.7)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue transition-colors cursor-pointer ${
        isActive ? "border-blue ring-1 ring-blue" : "border-white/15 hover:border-white/40"
      }`}
    >
      {isVideo ? (
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          {/* Subtle video badge */}
          <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 bg-black/75 px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-white">
            <Film className="h-2.5 w-2.5 text-blue" />
            <span>REEL</span>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <Image
            src={item.src}
            alt={item.alt || item.title}
            fill
            sizes="400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle photo badge */}
          <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 bg-black/75 px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-white">
            <Eye className="h-2.5 w-2.5 text-white/70" />
            <span>FRAME</span>
          </div>
        </div>
      )}

      {/* Minimal subtle label attached near the hovered media */}
      <div
        className={`pointer-events-none absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/80 px-1.5 py-0.5 font-mono text-[9px] tracking-wider transition-opacity duration-200 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <span className="font-semibold text-blue">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-white/40">/</span>
        <span className="text-white/90">{isVideo ? "VIDEO" : "PHOTO"}</span>
      </div>
    </button>
  );
}
