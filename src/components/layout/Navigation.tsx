"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useArchive } from "@/components/context/ArchiveProvider";
import { BrandWordmark, BrandMark } from "@/components/ui/BrandIdentity";

const SCROLL_TOP_THRESHOLD = 80;
const TRIGGER_ZONE_HEIGHT = 80;
const HIDE_DELAY_MS = 800;

export function Navigation() {
  const {
    openArchive,
    openCommandPalette,
    archiveOpen,
    commandOpen,
    selectedProjectSlug,
    reducedMotion,
  } = useArchive();

  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const headerRef = useRef<HTMLElement | null>(null);
  const isVisibleRef = useRef(true);
  const scrolledRef = useRef(false);
  const isNearTopRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isFocusInsideRef = useRef(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track whether the device supports fine pointer and hover
  const isFinePointerRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false
  );

  // Helper to clear pending hide timer
  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  // Helper to check if header must remain visible
  const shouldStayVisible = useCallback(() => {
    if (!isFinePointerRef.current) return true;
    if (typeof window !== "undefined" && window.scrollY <= SCROLL_TOP_THRESHOLD) return true;
    if (archiveOpen || commandOpen || Boolean(selectedProjectSlug)) return true;
    if (isFocusInsideRef.current) return true;
    if (isHoveringRef.current) return true;
    if (isNearTopRef.current) return true;
    return false;
  }, [archiveOpen, commandOpen, selectedProjectSlug]);

  // Schedule hiding the header after HIDE_DELAY_MS
  const scheduleHide = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      if (!shouldStayVisible()) {
        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          setIsVisible(false);
        }
      }
    }, HIDE_DELAY_MS);
  }, [clearHideTimer, shouldStayVisible]);

  // Immediately reveal the header
  const revealImmediately = useCallback(() => {
    clearHideTimer();
    if (!isVisibleRef.current) {
      isVisibleRef.current = true;
      setIsVisible(true);
    }
  }, [clearHideTimer]);

  // Listen to media query changes for pointer type
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    isFinePointerRef.current = mqFine.matches;

    const onMqChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
      if (!e.matches) {
        revealImmediately();
      }
    };

    mqFine.addEventListener("change", onMqChange);
    return () => mqFine.removeEventListener("change", onMqChange);
  }, [revealImmediately]);

  // Handle modal openings / closings from ArchiveProvider
  useEffect(() => {
    if (archiveOpen || commandOpen || Boolean(selectedProjectSlug)) {
      revealImmediately();
    } else {
      if (typeof window !== "undefined" && window.scrollY > SCROLL_TOP_THRESHOLD) {
        if (!isNearTopRef.current && !isHoveringRef.current && !isFocusInsideRef.current) {
          scheduleHide();
        }
      }
    }
  }, [archiveOpen, commandOpen, selectedProjectSlug, revealImmediately, scheduleHide]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const isPastTop = currentY > SCROLL_TOP_THRESHOLD;
      const isScrolledBg = currentY > 28;

      if (scrolledRef.current !== isScrolledBg) {
        scrolledRef.current = isScrolledBg;
        setScrolled(isScrolledBg);
      }

      // On touch devices, keep navigation visible as per existing behavior
      if (!isFinePointerRef.current) {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }
        return;
      }

      // At or near page top: immediately reveal and keep visible
      if (!isPastTop) {
        clearHideTimer();
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }
      } else {
        // Scrolled down: if not interacting/hovering/focused/modal, hide
        if (
          !isNearTopRef.current &&
          !isHoveringRef.current &&
          !isFocusInsideRef.current &&
          !archiveOpen &&
          !commandOpen &&
          !selectedProjectSlug
        ) {
          if (isVisibleRef.current && !hideTimerRef.current) {
            isVisibleRef.current = false;
            setIsVisible(false);
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearHideTimer();
    };
  }, [archiveOpen, commandOpen, selectedProjectSlug, clearHideTimer]);

  // Window mouse move listener for cursor in top trigger zone
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current) return;

      const nearTop = e.clientY <= TRIGGER_ZONE_HEIGHT;

      if (nearTop) {
        isNearTopRef.current = true;
        clearHideTimer();
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }
      } else {
        if (isNearTopRef.current) {
          isNearTopRef.current = false;
          if (typeof window !== "undefined" && window.scrollY > SCROLL_TOP_THRESHOLD) {
            scheduleHide();
          }
        }
      }
    };

    const onMouseLeaveDoc = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        isNearTopRef.current = false;
        isHoveringRef.current = false;
        if (typeof window !== "undefined" && window.scrollY > SCROLL_TOP_THRESHOLD) {
          scheduleHide();
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveDoc);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      clearHideTimer();
    };
  }, [clearHideTimer, scheduleHide]);

  // Hover handlers for the header element itself
  const handleMouseEnter = () => {
    if (!isFinePointerRef.current) return;
    isHoveringRef.current = true;
    clearHideTimer();
    if (!isVisibleRef.current) {
      isVisibleRef.current = true;
      setIsVisible(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!isFinePointerRef.current) return;
    isHoveringRef.current = false;
    // If the cursor leaves directly into the top trigger zone, maintain near-top status
    if (e.clientY <= TRIGGER_ZONE_HEIGHT && e.clientY >= 0) {
      isNearTopRef.current = true;
      return;
    }
    isNearTopRef.current = false;
    if (typeof window !== "undefined" && window.scrollY > SCROLL_TOP_THRESHOLD) {
      scheduleHide();
    }
  };

  // Keyboard accessibility: reveal on focus, allow hide on blur if focus exits header
  const handleFocusCapture = () => {
    isFocusInsideRef.current = true;
    clearHideTimer();
    if (!isVisibleRef.current) {
      isVisibleRef.current = true;
      setIsVisible(true);
    }
  };

  const handleBlurCapture = (e: React.FocusEvent) => {
    if (headerRef.current?.contains(e.relatedTarget as Node | null)) {
      return;
    }
    isFocusInsideRef.current = false;
    if (typeof window !== "undefined" && window.scrollY > SCROLL_TOP_THRESHOLD) {
      scheduleHide();
    }
  };

  return (
    <header
      ref={headerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      className={`sticky top-0 z-40 w-full ${
        reducedMotion
          ? "transition-none"
          : "transition-[transform,opacity,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      } ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-line/40 shadow-[0_4px_24px_-12px_rgba(18,18,18,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="editorial-container flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Primary Navigation Wordmark: Yash Srivastava */}
        <Link
          href="/#arrival"
          className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="Yash Srivastava — Personal Archive"
        >
          {/* Compact symbol for small screens */}
          <span className="sm:hidden">
            <BrandMark className="text-base" />
          </span>

          {/* Full typographic wordmark */}
          <span className="hidden sm:inline-block">
            <BrandWordmark />
          </span>

          {/* Quiet descriptor whisper on wide screens */}
          <span
            aria-hidden="true"
            className="hidden xl:inline-block pl-3 border-l border-line/80 font-mono text-[10px] tracking-[0.16em] text-muted uppercase"
          >
            DEVELOPER / CREATOR / THINKER
          </span>
        </Link>

        {/* Index of Personal Archive Navigation */}
        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-7 md:gap-9">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command palette (Ctrl + K)"
            className="hidden font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-blue md:inline-flex items-center gap-1.5"
          >
            <span>ctrl+k</span>
          </button>

          <button
            type="button"
            onClick={openArchive}
            aria-label="Open exhibition contents index"
            className="font-mono text-xs tracking-[0.14em] text-ink uppercase transition-colors hover:text-blue"
          >
            INDEX
          </button>

          <button
            type="button"
            onClick={openArchive}
            aria-label="Open archive menu"
            className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-ink uppercase transition-colors hover:text-blue"
          >
            <span className="sm:hidden font-mono text-[10px] text-muted tracking-widest">
              [YS]
            </span>
            <span>MENU</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
