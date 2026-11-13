"use client";

import React, { useEffect, useRef, useState } from "react";
import { useArchive } from "@/components/context/ArchiveProvider";

export function CustomCursor() {
  const { reducedMotion } = useArchive();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqDesktop = window.matchMedia("(min-width: 768px)");

    const syncCapability = () => {
      const active = mqFine.matches && mqDesktop.matches && !reducedMotion;
      setEnabled(active);
      document.documentElement.classList.toggle("has-custom-cursor", active);
    };

    syncCapability();
    mqFine.addEventListener("change", syncCapability);
    mqDesktop.addEventListener("change", syncCapability);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      mqFine.removeEventListener("change", syncCapability);
      mqDesktop.removeEventListener("change", syncCapability);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    let rafId = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const tick = () => {
      currentX += (targetX - currentX) * 0.34;
      currentY += (targetY - currentY) * 0.34;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest<HTMLElement>("[data-cursor]");
      if (cursorEl) {
        setLabel(cursorEl.dataset.cursor || "VIEW");
      } else if (target?.closest("a, button")) {
        setLabel("OPEN");
      } else {
        setLabel(null);
      }
    };

    const handleLeave = () => setVisible(false);

    rafId = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {label ? (
        <div className="flex items-center gap-1.5 bg-blue px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-paper uppercase">
          <span>+</span>
          <span>{label}</span>
        </div>
      ) : (
        <div className="flex h-4 w-4 items-center justify-center font-mono text-sm leading-none text-ink">
          +
        </div>
      )}
    </div>
  );
}
