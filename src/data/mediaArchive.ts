/**
 * =========================================================================
 * YASH SRIVASTAVA — CENTRALIZED MEDIA ARCHIVE CONFIGURATION
 * =========================================================================
 *
 * SINGLE SOURCE OF TRUTH for the unified Visual Archive (`05 / VISUAL ARCHIVE`).
 * All creative media assets, spatial coordinates, dimensions, and metadata
 * are configured here.
 * =========================================================================
 */

export const DEFAULT_ARCHIVE_IMAGE = "/assets/creative/default-placeholder.jpg";
export const DEFAULT_VIDEO_POSTER = "/assets/creative/video-placeholder.jpg";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  thumbnail?: string;
  alt?: string;
  title: string;
  category: string;
  description?: string;
  width: number;
  height: number;
  size: "s" | "m" | "l";
  x: number;
  y: number;
  z: number;
  rotateY?: number;
  rotateZ?: number;
};

/**
 * 12 REAL UNIQUE ASSETS COMPOSING THE 3D SPATIAL ARCHIVE
 * - x: -600 to 600
 * - y: -350 to 350
 * - z: -700 to 0
 * - rotateY: -20 to 20
 * - rotateZ: -4 to 4
 * - Central area (x: -180..180, y: -160..160) kept clear for captions
 */
export const VISUAL_ARCHIVE_ITEMS: MediaItem[] = [
  {
    id: "item-01",
    type: "image",
    src: "/assets/creative/photo-01.jpg",
    thumbnail: "/assets/creative/photo-01.jpg",
    title: "Night Study",
    category: "PHOTOGRAPHY",
    description: "Ambient sodium vapor and quiet geometry before dawn in Delhi.",
    alt: "Yash in elevator with badminton bag under warm lighting",
    width: 960,
    height: 1280,
    size: "l",
    x: -420,
    y: -200,
    z: -180,
    rotateY: 10,
    rotateZ: -2,
  },
  {
    id: "item-02",
    type: "video",
    src: "/assets/creative/video-reel-01.mp4",
    poster: "/assets/creative/video-reel-01-poster.jpg",
    thumbnail: "/assets/creative/video-reel-01-poster.jpg",
    title: "Rhythm & The Line",
    category: "SKETCH ANIMATION",
    description: "Original hand-drawn Vagabond and anime sketch wall animation.",
    alt: "Original sketch animation video signed Yash",
    width: 478,
    height: 850,
    size: "m",
    x: -240,
    y: -240,
    z: -350,
    rotateY: 6,
    rotateZ: 1.5,
  },
  {
    id: "item-03",
    type: "image",
    src: "/assets/creative/photo-02.jpg",
    thumbnail: "/assets/creative/photo-02.jpg",
    title: "Architectural Stillness",
    category: "PHOTOGRAPHY",
    description: "Noticing structural lines in unexpected negative space.",
    alt: "Tall portrait orientation photograph with rich texture",
    width: 720,
    height: 960,
    size: "s",
    x: 220,
    y: -260,
    z: -480,
    rotateY: -8,
    rotateZ: -1,
  },
  {
    id: "item-04",
    type: "video",
    src: "/assets/creative/video-reel-02.mp4",
    poster: "/assets/creative/video-reel-02-poster.jpg",
    thumbnail: "/assets/creative/video-reel-02-poster.jpg",
    title: "Golden Hour Drift",
    category: "CINEMATOGRAPHY",
    description: "Atmospheric stillness and sunset light filtering through tree silhouettes.",
    alt: "Golden sunset video through trees",
    width: 1920,
    height: 1080,
    size: "l",
    x: 440,
    y: -180,
    z: -120,
    rotateY: -12,
    rotateZ: 2,
  },
  {
    id: "item-05",
    type: "image",
    src: "/assets/creative/photo-03.jpg",
    thumbnail: "/assets/creative/photo-03.jpg",
    title: "Shadow & Texture",
    category: "PHOTOGRAPHY",
    description: "When darkness and flash reflections carry more weight than the subject.",
    alt: "Mirror selfie with flash flare and necklace",
    width: 720,
    height: 960,
    size: "m",
    x: -480,
    y: 40,
    z: -280,
    rotateY: 14,
    rotateZ: -1.5,
  },
  {
    id: "item-06",
    type: "video",
    src: "/assets/creative/video-reel-03.mp4",
    poster: "/assets/creative/video-reel-03-poster.jpg",
    thumbnail: "/assets/creative/video-reel-03-poster.jpg",
    title: "Rooftop Horizons",
    category: "VIDEO EDIT",
    description: "Late evening rooftop cut observing the city's quiet horizon.",
    alt: "Rooftop sunset view video",
    width: 480,
    height: 854,
    size: "s",
    x: -280,
    y: 220,
    z: -520,
    rotateY: 8,
    rotateZ: 2,
  },
  {
    id: "item-07",
    type: "image",
    src: "/assets/creative/photo-04.jpg",
    thumbnail: "/assets/creative/photo-04.jpg",
    title: "Silent Observation",
    category: "PHOTOGRAPHY",
    description: "Intimate frame captured without ceremony or rehearsal.",
    alt: "Mirror selfie with camera flash reflection",
    width: 720,
    height: 1280,
    size: "l",
    x: -440,
    y: 250,
    z: -80,
    rotateY: 12,
    rotateZ: -2.5,
  },
  {
    id: "item-08",
    type: "video",
    src: "/assets/creative/video-reel-04.mp4",
    poster: "/assets/creative/video-reel-04-poster.jpg",
    thumbnail: "/assets/creative/video-reel-04-poster.jpg",
    title: "City Sunburst",
    category: "CINEMATOGRAPHY",
    description: "Expansive golden rays spreading across the city skyline at dusk.",
    alt: "Panoramic golden hour city sunset",
    width: 480,
    height: 854,
    size: "m",
    x: 460,
    y: 60,
    z: -300,
    rotateY: -14,
    rotateZ: 1,
  },
  {
    id: "item-09",
    type: "image",
    src: "/assets/creative/photo-05.jpg",
    thumbnail: "/assets/creative/photo-05.jpg",
    title: "Corridor Lines",
    category: "PHOTOGRAPHY",
    description: "Open sky and tree line framed by white cotton texture.",
    alt: "Yash portrait in white shirt outdoors with tree and sky",
    width: 720,
    height: 1280,
    size: "s",
    x: 260,
    y: 220,
    z: -450,
    rotateY: -7,
    rotateZ: -1,
  },
  {
    id: "item-10",
    type: "video",
    src: "/assets/creative/video-reel-05.mp4",
    poster: "/assets/creative/video-reel-05-poster.jpg",
    thumbnail: "/assets/creative/video-reel-05-poster.jpg",
    title: "Night Transit",
    category: "MOTION STUDY",
    description: "Late-night road walk in traditional kurta with car headlights.",
    alt: "Night transit video walking on road",
    width: 480,
    height: 854,
    size: "l",
    x: 420,
    y: 250,
    z: -100,
    rotateY: -10,
    rotateZ: 2.5,
  },
  {
    id: "item-11",
    type: "image",
    src: "/assets/yash-portrait-side.jpg",
    thumbnail: "/assets/yash-portrait-side.jpg",
    title: "Nocturne Portrait",
    category: "PORTRAIT",
    description: "Plate 01 — Candid portrait under natural street sodium light.",
    alt: "Yash Srivastava, night portrait with natural side-facing gaze",
    width: 1200,
    height: 1600,
    size: "m",
    x: -80,
    y: 290,
    z: -240,
    rotateY: 3,
    rotateZ: -1,
  },
  {
    id: "item-12",
    type: "image",
    src: "/assets/yash-walking-motion.jpg",
    thumbnail: "/assets/yash-walking-motion.jpg",
    title: "Long Shutter Walk",
    category: "PHOTOGRAPHY",
    description: "24fps night blur: the eye connects what the shutter leaves behind.",
    alt: "Cinematic night scene of Yash walking forward with atmospheric blur",
    width: 1200,
    height: 1600,
    size: "m",
    x: 100,
    y: 290,
    z: -200,
    rotateY: -4,
    rotateZ: 1.5,
  },
];

// Backward compatibility types & exports
export interface CreativeVideoItem {
  id: string;
  number: string;
  title: string;
  label: string;
  subtitle: string;
  description: string;
  src: string | null;
  poster: string;
  timecode: string;
  duration: string;
  aspect: string;
  fps: string;
  technique: string;
  tool: string;
}

export interface CreativeImageItem {
  id: string;
  plate: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  role: string;
  orientation: string;
  aspect: string;
  year: string;
  location: string;
  whisper?: string;
  exposureNote?: string;
}

export const creativeArchive = {
  videos: VISUAL_ARCHIVE_ITEMS.filter((i) => i.type === "video").map((v, idx) => ({
    id: v.id,
    number: `0${idx + 1}`,
    title: v.title,
    label: v.category,
    subtitle: v.title,
    description: v.description || "",
    src: v.src,
    poster: v.poster || DEFAULT_VIDEO_POSTER,
    timecode: "00:01:00:00",
    duration: "0:30",
    aspect: "16/9",
    fps: "24 FPS",
    technique: "Direct Cinema",
    tool: "DaVinci Resolve",
  })) as CreativeVideoItem[],
  images: VISUAL_ARCHIVE_ITEMS.filter((i) => i.type === "image").map((img, idx) => ({
    id: img.id,
    plate: `0${idx + 1}`,
    title: img.title,
    caption: `0${idx + 1} / ${img.title.toUpperCase()}`,
    src: img.src,
    alt: img.alt || img.title,
    role: "photograph",
    orientation: "landscape",
    aspect: "aspect-[16/10]",
    year: "2026",
    location: "Personal Archive",
  })) as CreativeImageItem[],
};

export const VIDEO_ARCHIVE_REELS = creativeArchive.videos;
export const IMAGE_ARCHIVE_ITEMS = creativeArchive.images;
export type VideoReel = CreativeVideoItem;
export type ImageArchiveItem = CreativeImageItem;
