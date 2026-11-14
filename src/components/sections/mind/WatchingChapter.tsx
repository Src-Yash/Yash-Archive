"use client";

import React, { useState } from "react";
import { Film, Star, X } from "lucide-react";
import { MOVIES, type Movie } from "@/data/mind";
import { MoviePoster } from "./MoviePoster";
import { useModalDialog } from "@/components/ui/useModalDialog";
import { useArchive } from "@/components/context/ArchiveProvider";

export function WatchingChapter() {
  const { reducedMotion } = useArchive();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);

  const dialogRef = useModalDialog({
    isOpen: Boolean(selectedMovie),
    onClose: () => setSelectedMovie(null),
  });

  return (
    <article
      id="mind-watching"
      className="relative rounded-[2px] border border-[#26262A] bg-[#0C0C0E] text-[#F2EFE8] shadow-2xl overflow-hidden"
    >
      {/* Chapter Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#26262A] bg-[#121215]/90 px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-blue">02</span>
          <span className="font-mono text-xs tracking-[0.2em] text-[#8E8B84] uppercase">
            CHAPTER / WATCHING
          </span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.14em] text-[#8E8B84] uppercase">
          Stories that stayed with me.
        </p>
      </div>

      <div className="p-6 md:p-10 lg:p-12 space-y-12">
        {/* Editorial Section Introduction */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#26262A] pb-8">
          <div className="space-y-1">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue uppercase font-semibold">
              {MOVIES.length} CINEMATIC MILESTONES
            </p>
            <h3 className="font-display text-2xl font-bold tracking-tight text-[#F2EFE8] uppercase sm:text-3xl md:text-4xl">
              CURATED FILM ARCHIVE
            </h3>
          </div>
          <p className="max-w-md font-sans text-xs sm:text-sm text-[#8E8B84] leading-relaxed">
            A personal collection of narrative, atmosphere, and frames that rewired how I think about pacing, scale, and human nature.
          </p>
        </div>

        {/* Dynamic Editorial Poster Wall with Varied Scales and Rhythms */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 items-start">
          {MOVIES.map((movie, index) => {
            const isHovered = movie.id === hoveredMovieId;
            const isFeatured = Boolean(movie.featured);

            return (
              <div
                key={movie.id}
                className={
                  isFeatured
                    ? "col-span-2 row-span-2"
                    : "col-span-1"
                }
              >
                <button
                  type="button"
                  onClick={() => setSelectedMovie(movie)}
                  onMouseEnter={() => setHoveredMovieId(movie.id)}
                  onMouseLeave={() => setHoveredMovieId(null)}
                  onFocus={() => setHoveredMovieId(movie.id)}
                  onBlur={() => setHoveredMovieId(null)}
                  aria-haspopup="dialog"
                  aria-label={`View cinematic details for ${movie.title} (${movie.year})`}
                  className={`group relative flex flex-col w-full h-full text-left transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-blue ${
                    reducedMotion ? "" : "hover:-translate-y-2"
                  }`}
                >
                  {/* Hero Poster Visual Plate */}
                  <div className="w-full">
                    <MoviePoster
                      movie={movie}
                      isHovered={isHovered}
                      featured={isFeatured}
                      priority={index < 4}
                    />
                  </div>

                  {/* Restrained Secondary Metadata */}
                  <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5 font-mono text-[11px] text-[#8E8B84]">
                    <span className="truncate font-display text-xs font-semibold text-[#F2EFE8] group-hover:text-blue transition-colors">
                      {movie.title}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 text-[10px] text-[#706D67]">
                      <span>{movie.year}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-[#A6A29A]">
                        <Star className="h-2.5 w-2.5 text-blue fill-blue" aria-hidden="true" />
                        {movie.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Focused Cinematic Detail Modal */}
      {selectedMovie && (
        <dialog
          ref={dialogRef}
          closedby="any"
          aria-labelledby="movie-dialog-title"
          className="m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border border-[#333338] bg-[#121215] p-0 text-[#F2EFE8] shadow-2xl backdrop:bg-black/80"
        >
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#26262A] pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-blue uppercase tracking-widest font-semibold">
                <Film className="h-4 w-4" aria-hidden="true" />
                <span>ARCHIVAL FEATURE SPECIFICATION</span>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setSelectedMovie(null)}
                aria-label="Close movie details"
                className="inline-flex h-8 w-8 items-center justify-center text-[#8E8B84] transition-colors hover:text-[#F2EFE8]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Poster Preview + Core Details */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 max-w-[200px] mx-auto sm:mx-0 w-full">
                <MoviePoster
                  movie={selectedMovie}
                  featured={true}
                  priority={true}
                />
              </div>

              <div className="sm:col-span-7 space-y-4">
                <div>
                  <p className="font-mono text-xs tracking-widest text-[#8E8B84] uppercase">
                    DIR. {selectedMovie.director.toUpperCase()}
                  </p>
                  <h3
                    id="movie-dialog-title"
                    className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F2EFE8]"
                  >
                    {selectedMovie.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[#8E8B84]">
                  {selectedMovie.year && (
                    <span className="border border-[#26262A] bg-[#18181D] px-2.5 py-1">
                      YEAR: {selectedMovie.year}
                    </span>
                  )}
                  {typeof selectedMovie.rating === "number" && (
                    <span className="border border-[#26262A] bg-[#18181D] px-2.5 py-1 flex items-center gap-1.5 text-blue font-semibold">
                      <Star className="h-3.5 w-3.5 fill-blue text-blue" aria-hidden="true" />
                      IMDb: {selectedMovie.rating.toFixed(1)} / 10
                    </span>
                  )}
                  <span className="border border-[#26262A] bg-[#18181D] px-2.5 py-1">
                    FORMAT: {selectedMovie.format} ({selectedMovie.ratio})
                  </span>
                </div>
              </div>
            </div>

            {/* Why This Stayed With Me Archival Reflection */}
            <div className="space-y-2.5 border-l-2 border-blue bg-[#16161B] p-5 text-sm text-[#A6A29A] leading-relaxed">
              <p className="font-mono text-[10px] tracking-widest text-blue uppercase font-semibold">
                WHY THIS STAYED WITH ME →
              </p>
              <p className="font-sans text-base text-[#E2DDD4]">
                {selectedMovie.whyItStayed}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-[#26262A] pt-4 font-mono text-xs text-[#706D67]">
              <span>YASH SRIVASTAVA · FILM ARCHIVE</span>
              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
                className="px-4 py-2 uppercase border border-[#26262A] text-[#8E8B84] hover:text-[#F2EFE8] hover:border-blue transition-colors"
              >
                Return to archive
              </button>
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
}
