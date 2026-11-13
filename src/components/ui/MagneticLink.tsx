"use client";

import React, { useRef, useState } from "react";
import { useArchive } from "@/components/context/ArchiveProvider";

interface MagneticLinkProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  cursorLabel?: "VIEW" | "OPEN" | "PLAY" | "READ";
  ariaLabel?: string;
  external?: boolean;
  type?: "button" | "submit";
  strength?: number;
}

export function MagneticLink({
  children,
  className = "",
  href,
  onClick,
  cursorLabel = "OPEN",
  ariaLabel,
  external = false,
  type = "button",
  strength = 0.22,
}: MagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useArchive();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const style: React.CSSProperties = {
    transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
    transition:
      offset.x === 0 && offset.y === 0
        ? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)"
        : "transform 80ms linear",
  };

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className="inline-block"
      >
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          onClick={onClick}
          data-cursor={cursorLabel}
          aria-label={ariaLabel}
          className={className}
        >
          {children}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        data-cursor={cursorLabel}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </button>
    </div>
  );
}
