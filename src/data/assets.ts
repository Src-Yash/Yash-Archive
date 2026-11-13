/**
 * Centralized registry of personal photos, videos, and creative assets.
 * All image sources and metadata are defined in `mediaArchive.ts` so they can be
 * easily updated or swapped in the future without touching component code.
 */

import {
  DEFAULT_ARCHIVE_IMAGE,
  DEFAULT_VIDEO_POSTER,
  creativeArchive,
  VISUAL_ARCHIVE_ITEMS,
  type MediaItem,
  type CreativeVideoItem,
  type CreativeImageItem,
} from "./mediaArchive";

export {
  DEFAULT_ARCHIVE_IMAGE,
  DEFAULT_VIDEO_POSTER,
  creativeArchive,
  VISUAL_ARCHIVE_ITEMS,
  type MediaItem,
  type CreativeVideoItem,
  type CreativeImageItem,
};

export interface PortfolioAsset {
  src: string;
  alt: string;
  caption?: string;
  plate?: string;
}

export type VideoAsset = CreativeVideoItem;

export const PORTFOLIO_ASSETS = {
  // Hero cinematic full-bleed background
  heroBackground: {
    src: "/images/hero-background.jpeg",
    alt: "Cinematic night scene of Yash walking on a road with atmospheric motion blur",
  },

  // Portrait / side-facing photograph: used in the "WHO I AM" chapter
  portraitSide: {
    src: "/assets/yash-portrait-side.jpg",
    alt: "Yash Srivastava, night portrait with natural side-facing gaze and cinematic street lighting",
    caption: "Plate 01 — Yash Srivastava / Lucknow & Delhi, India",
    plate: "PL.01",
  },

  // Walking motion-blur photograph
  journeyWalking: {
    src: "/assets/yash-walking-motion.jpg",
    alt: "Cinematic night scene of Yash walking forward on a road with atmospheric motion blur",
    caption: "Transition — In motion, 24fps night blur",
    plate: "PL.02",
  },

  // Central intro sketch sequence
  introSketchAnimation: {
    src: "/assets/creative/sketch-animation.mp4",
    poster: "/assets/creative/sketch-animation-poster.jpg",
    alt: "Original hand-drawn sketch animation by Yash Srivastava",
  },

  // Centralized media archive references
  defaultPlaceholderImage: DEFAULT_ARCHIVE_IMAGE,
  creativePhotos: creativeArchive.images,
  creativeVideos: creativeArchive.videos,
  visualArchiveItems: VISUAL_ARCHIVE_ITEMS,
} as const;
