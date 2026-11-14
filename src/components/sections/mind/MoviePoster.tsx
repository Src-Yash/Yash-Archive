"use client";

import React from "react";
import Image from "next/image";
import { type Movie } from "@/data/mind";

interface MoviePosterProps {
  movie: Movie;
  isHovered?: boolean;
  featured?: boolean;
  priority?: boolean;
  className?: string;
}

export function MoviePoster({
  movie,
  isHovered = false,
  featured = false,
  priority = false,
  className = "",
}: MoviePosterProps) {
  return (
    <div
      className={`relative aspect-[2/3] w-full overflow-hidden rounded-[2px] bg-[#121215] border transition-all duration-500 ease-out ${
        isHovered
          ? "border-blue/70 shadow-[0_16px_36px_rgba(0,0,0,0.7)]"
          : "border-[#26262C] shadow-md"
      } ${className}`}
    >
      <Image
        src={movie.poster}
        alt={`Theatrical poster for ${movie.title} (${movie.year})`}
        fill
        sizes={
          featured
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            : "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
        }
        priority={priority}
        className={`object-cover transition-transform duration-500 ease-out ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      />

      {/* Subtle format badge pinned to the top right on hover */}
      <div
        aria-hidden="true"
        className={`absolute top-2 right-2 rounded-[1px] bg-black/75 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-[#A6A29A] uppercase backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {movie.format}
      </div>
    </div>
  );
}
