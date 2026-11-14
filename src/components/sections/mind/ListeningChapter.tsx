"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Disc3, Volume2 } from "lucide-react";
import {
  MUSIC_COLLECTIONS,
  SONGS,
  type Song,
} from "@/data/mind";
import { useArchive } from "@/components/context/ArchiveProvider";

export function ListeningChapter() {
  const { reducedMotion } = useArchive();
  const [activeCollectionId, setActiveCollectionId] = useState<string>("all");
  const [selectedSongId, setSelectedSongId] = useState<string>(SONGS[0].id);
  const [hoveredSongId, setHoveredSongId] = useState<string | null>(null);

  const activeSong: Song = useMemo(() => {
    return SONGS.find((s) => s.id === selectedSongId) || SONGS[0];
  }, [selectedSongId]);

  const activeCollection = useMemo(() => {
    return MUSIC_COLLECTIONS.find((c) => c.id === activeSong.collection);
  }, [activeSong]);

  const visibleCollections = useMemo(() => {
    if (activeCollectionId === "all") return MUSIC_COLLECTIONS;
    return MUSIC_COLLECTIONS.filter((col) => col.id === activeCollectionId);
  }, [activeCollectionId]);

  // Overall index for visual gauge
  const overallIndex = SONGS.findIndex((s) => s.id === activeSong.id);
  const positionPercentage = ((overallIndex + 1) / SONGS.length) * 100;

  return (
    <article
      id="mind-listening"
      className="relative rounded-[2px] border border-[#26262A] bg-[#0E0E10] text-[#F2EFE8] shadow-2xl overflow-hidden"
    >
      {/* Chapter Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#26262A] bg-[#141417]/90 px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-blue">01</span>
          <span className="font-mono text-xs tracking-[0.2em] text-[#8E8B84] uppercase">
            CHAPTER / LISTENING
          </span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.14em] text-[#8E8B84] uppercase">
          What I keep coming back to.
        </p>
      </div>

      <div className="p-6 md:p-10 lg:p-12 space-y-12">
        {/* Top Control Bar: Active Record Player Console & Filter Tabs */}
        <div className="space-y-6 border-b border-[#26262A] pb-8">
          {/* Active Record Inspect Console */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-[2px] border border-[#2A2A30] bg-[#141418] p-5 sm:p-6">
            {/* Left mini active artist visual sleeve */}
            <div className="md:col-span-3 lg:col-span-2 flex justify-center md:justify-start">
              <div className="relative aspect-square w-24 h-24 sm:w-28 sm:h-28 md:w-full md:max-w-[120px] overflow-hidden rounded-[2px] border border-[#33333A] shadow-md bg-[#18181D]">
                {activeCollection && (
                  <Image
                    src={activeCollection.image}
                    alt={`Portrait of ${activeSong.artist}`}
                    fill
                    sizes="(max-width: 768px) 120px, 140px"
                    priority
                    className="object-cover"
                  />
                )}
                {/* Subtle vignette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Center Track Details */}
            <div className="md:col-span-6 lg:col-span-7 space-y-2 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-blue uppercase font-semibold">
                  <Disc3 className="h-3.5 w-3.5 animate-spin duration-3000" aria-hidden="true" />
                  CURRENT ROTATION
                </span>
                <span className="font-mono text-[10px] text-[#706D67]">·</span>
                <span className="font-mono text-[10px] tracking-wider text-[#A6A29A] uppercase">
                  {activeCollection?.name}
                </span>
                <span className="font-mono text-[10px] text-[#706D67]">·</span>
                <span className="font-mono text-[10px] text-[#706D67]">{activeSong.catalogId}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F2EFE8]">
                {activeSong.title}
              </h3>

              <p className="font-sans text-sm text-[#A6A29A]">
                <span className="font-semibold text-[#F2EFE8]">{activeSong.artist}</span>
                {activeSong.curatorNote && (
                  <span className="hidden sm:inline text-[#8E8B84]"> — {activeSong.curatorNote}</span>
                )}
              </p>
            </div>

            {/* Right Gauge */}
            <div className="md:col-span-3 lg:col-span-3 flex flex-col justify-between space-y-3 md:border-l md:border-[#26262A] md:pl-6 text-xs font-mono">
              <div className="flex items-center justify-between text-[#8E8B84] text-[10px] tracking-wider uppercase">
                <span>Archive Index</span>
                <span className="text-blue font-semibold">
                  #{activeSong.trackNumber} / {SONGS.length}
                </span>
              </div>
              <div className="h-[2px] w-full bg-[#26262A]">
                <div
                  className="h-full bg-blue transition-all duration-300 ease-out"
                  style={{ width: `${positionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#706D67]">
                <span className="flex items-center gap-1 text-blue font-semibold">
                  <Volume2 className="h-3 w-3" /> ACTIVE
                </span>
                <span>{activeSong.bpm || "STUDIO TAPE"}</span>
              </div>
            </div>
          </div>

          {/* Collection Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="mr-3 font-mono text-[11px] tracking-[0.16em] text-[#706D67] uppercase">
              ARTIST:
            </span>
            <button
              type="button"
              onClick={() => setActiveCollectionId("all")}
              className={`px-3.5 py-1.5 font-mono text-xs tracking-[0.1em] uppercase transition-colors rounded-[2px] ${
                activeCollectionId === "all"
                  ? "bg-blue text-white font-semibold"
                  : "text-[#8E8B84] hover:bg-[#1A1A1E] hover:text-[#F2EFE8]"
              }`}
            >
              All Records ({SONGS.length})
            </button>
            {MUSIC_COLLECTIONS.map((col) => {
              const count = SONGS.filter((s) => s.collection === col.id).length;
              const isActive = activeCollectionId === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveCollectionId(col.id)}
                  className={`px-3.5 py-1.5 font-mono text-xs tracking-[0.1em] uppercase transition-colors rounded-[2px] ${
                    isActive
                      ? "bg-blue text-white font-semibold"
                      : "text-[#8E8B84] hover:bg-[#1A1A1E] hover:text-[#F2EFE8]"
                  }`}
                >
                  {col.artist} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Music Archive Grouped by Editorial Artist Chapters */}
        <div className="space-y-20">
          {visibleCollections.map((col, colIndex) => {
            const collectionSongs = SONGS.filter((s) => s.collection === col.id);
            const isArtistPlaying = activeSong.collection === col.id;

            return (
              <section key={col.id} className="space-y-8">
                {/* Editorial Chapter Marker Header */}
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#26262A] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: col.accentColor }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-xs tracking-[0.16em] uppercase font-semibold text-[#8E8B84]">
                        CHAPTER {col.number} · {col.curationTag}
                      </span>
                    </div>
                    <h4 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F2EFE8]">
                      {col.artist} — {col.name}
                    </h4>
                  </div>
                  <p className="max-w-md font-sans text-xs sm:text-sm text-[#8E8B84] leading-relaxed">
                    {col.description}
                  </p>
                </div>

                {/* Editorial Split Layout: Hero Artist Photograph on Left + Archival Tracklist on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Authentic Artist Visual Anchor */}
                  <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-4">
                    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2px] border border-[#26262A] bg-[#141418] shadow-xl">
                      <Image
                        src={col.image}
                        alt={`Photograph of ${col.artist}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority={colIndex === 0}
                        className={`object-cover object-top transition-transform duration-700 ease-out ${
                          reducedMotion ? "" : "group-hover:scale-105"
                        }`}
                      />

                      {/* Editorial Gradient & Information Scrim */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/40 to-transparent"
                      />

                      {/* Bottom Overlay with Artist Details */}
                      <div className="absolute inset-x-0 bottom-0 p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-[1px] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase text-white shadow-sm"
                            style={{ backgroundColor: col.accentColor }}
                          >
                            {col.name}
                          </span>
                          <span className="font-mono text-[11px] text-[#A6A29A]">
                            {collectionSongs.length} TRACKS
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F2EFE8]">
                            {col.artist}
                          </h5>
                          <p className="font-sans text-xs text-[#A6A29A] mt-1 line-clamp-2">
                            {col.description}
                          </p>
                        </div>

                        {/* Active Rotation Indicator on Artist Card */}
                        {isArtistPlaying && (
                          <div className="flex items-center gap-2 border-t border-[#33333A] pt-3 text-[11px] font-mono text-blue font-semibold">
                            <Disc3 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                            <span className="truncate">IN ROTATION: {activeSong.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Archival Tracklist with Rich Typography & Instant Selection */}
                  <div className="lg:col-span-7 xl:col-span-8 rounded-[2px] border border-[#222226] bg-[#121215] divide-y divide-[#202024] overflow-hidden shadow-lg">
                    {collectionSongs.map((song) => {
                      const isSelected = song.id === selectedSongId;
                      const isHovered = song.id === hoveredSongId;

                      return (
                        <button
                          key={song.id}
                          type="button"
                          onClick={() => setSelectedSongId(song.id)}
                          onMouseEnter={() => setHoveredSongId(song.id)}
                          onMouseLeave={() => setHoveredSongId(null)}
                          onFocus={() => setHoveredSongId(song.id)}
                          onBlur={() => setHoveredSongId(null)}
                          aria-label={`Select track ${song.title} by ${song.artist}`}
                          className={`group relative flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue ${
                            isSelected
                              ? "bg-[#181820] border-l-2 border-blue"
                              : isHovered
                              ? "bg-[#16161A]"
                              : "hover:bg-[#151518]"
                          }`}
                        >
                          {/* Left: Track Number + Title & Curator Note */}
                          <div className="flex items-start gap-4 sm:gap-5 min-w-0 pr-4">
                            <span
                              className={`font-mono text-xs sm:text-sm font-semibold tracking-wider pt-0.5 transition-colors ${
                                isSelected ? "text-blue" : "text-[#706D67] group-hover:text-[#A6A29A]"
                              }`}
                            >
                              {song.trackNumber}
                            </span>

                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h6
                                  className={`font-display text-base sm:text-lg font-bold tracking-tight truncate transition-colors ${
                                    isSelected
                                      ? "text-blue"
                                      : "text-[#F2EFE8] group-hover:text-blue"
                                  }`}
                                >
                                  {song.title}
                                </h6>
                                {isSelected && (
                                  <span className="inline-flex items-center gap-1 rounded-[1px] bg-blue/15 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-blue uppercase">
                                    <Volume2 className="h-2.5 w-2.5" aria-hidden="true" />
                                    Active
                                  </span>
                                )}
                              </div>

                              {song.curatorNote && (
                                <p className="font-sans text-xs text-[#8E8B84] line-clamp-1 group-hover:text-[#A6A29A] transition-colors">
                                  {song.curatorNote}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right: Technical Metadata / BPM & Select Cue */}
                          <div className="flex items-center gap-4 shrink-0 font-mono text-xs text-[#706D67]">
                            <span className="hidden sm:inline-block text-[11px] text-[#706D67]">
                              {song.bpm || song.catalogId}
                            </span>
                            <span
                              className={`text-[11px] font-medium transition-colors ${
                                isSelected
                                  ? "text-blue"
                                  : "text-[#706D67] group-hover:text-[#F2EFE8]"
                              }`}
                            >
                              {isSelected ? "PLAYING" : "SELECT →"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
