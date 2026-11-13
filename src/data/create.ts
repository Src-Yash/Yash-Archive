export type CreateCategory =
  | "ALL"
  | "VIDEO EDIT"
  | "POSTER"
  | "ART"
  | "SKETCH"
  | "PHOTOGRAPHY"
  | "EXPERIMENT";

export interface CreateFrame {
  id: string;
  frameNumber: string;
  timecode: string;
  category: Exclude<CreateCategory, "ALL">;
  title: string;
  medium: string;
  year: string;
  aspect: "wide" | "tall" | "square" | "cinema";
  plateKind: "timeline" | "poster" | "negative" | "sketch" | "transit" | "motion";
  note: string;
}

export const CREATE_FRAMES: CreateFrame[] = [
  {
    id: "nocturne-24fps",
    frameNumber: "FRAME_01",
    timecode: "00:01:14:08",
    category: "VIDEO EDIT",
    title: "NOCTURNE IN 24FPS",
    medium: "Premiere / Sound Design / Rhythm Cut",
    year: "2026",
    aspect: "cinema",
    plateKind: "timeline",
    note: "A pacing study built around match cuts, room tone, and letting quiet frames breathe half a second longer than feels comfortable.",
  },
  {
    id: "static-and-signal",
    frameNumber: "FRAME_02",
    timecode: "00:02:03:19",
    category: "POSTER",
    title: "STATIC & SIGNAL",
    medium: "Swiss Grid / Print Typography Study",
    year: "2026",
    aspect: "tall",
    plateKind: "poster",
    note: "Exploring tension between rigid architectural grids and a single displaced orange coordinate.",
  },
  {
    id: "margin-architecture",
    frameNumber: "FRAME_03",
    timecode: "00:03:41:02",
    category: "SKETCH",
    title: "MARGIN ARCHITECTURE",
    medium: "Fineliner on Cream Paper / Notebook Scan",
    year: "2026",
    aspect: "square",
    plateKind: "sketch",
    note: "Where most systems actually begin—unruled paper, arrows, crossed-out assumptions, and small geometric studies.",
  },
  {
    id: "late-transit-35mm",
    frameNumber: "FRAME_04",
    timecode: "00:04:55:11",
    category: "PHOTOGRAPHY",
    title: "26.11° N / LATE TRANSIT",
    medium: "35mm Study / High-Contrast Monochrome",
    year: "2026",
    aspect: "wide",
    plateKind: "transit",
    note: "Empty platforms, sodium vapor shadows, and geometry that only appears after midnight.",
  },
  {
    id: "negative-mass",
    frameNumber: "FRAME_05",
    timecode: "00:06:12:22",
    category: "ART",
    title: "NEGATIVE MASS",
    medium: "Generative Composition / Ink & Paper",
    year: "2025",
    aspect: "tall",
    plateKind: "negative",
    note: "An exercise in removing elements until the emptiness itself carries weight.",
  },
  {
    id: "gravity-study-04",
    frameNumber: "FRAME_06",
    timecode: "00:07:29:04",
    category: "EXPERIMENT",
    title: "GRAVITY STUDY NO. 4",
    medium: "Kinetic Type / Interactive Frame",
    year: "2026",
    aspect: "square",
    plateKind: "motion",
    note: "Early motion prototype that directly inspired the suspended coordinate system in this archive.",
  },
];
