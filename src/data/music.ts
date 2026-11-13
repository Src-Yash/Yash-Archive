/**
 * Music archive — artists living in Yash's headphones.
 * Structured so Yash can easily update favorite tracks, albums, or notes anytime.
 */

export interface MusicArtist {
  id: string;
  name: string;
  role: string;
  tagline: string;
  listeningNote: string;
  tempo: string;
  waveformPattern: number[]; // relative waveform heights [0.2 - 1.0]
  // Structured placeholders for Yash to drop in favorite songs/albums
  favoriteTrackPlaceholder?: string;
  favoriteAlbumPlaceholder?: string;
}

export const HEADPHONE_ARTISTS: MusicArtist[] = [
  {
    id: "nusrat",
    name: "NUSRAT FATEH ALI KHAN",
    role: "Qawwali / Sufi / Trance",
    tagline: "Timeless vocal momentum and harmonic infinity.",
    listeningNote:
      "When debugging deep async architectures after midnight, thirty-minute improvisations create a steady flow state where clock time disappears.",
    tempo: "SPIRITUAL CADENCE · 72-140 BPM",
    waveformPattern: [0.3, 0.45, 0.7, 0.9, 0.85, 0.6, 0.95, 1.0, 0.8, 0.5, 0.3],
    favoriteTrackPlaceholder: "[ Add favorite track, e.g. 'Ye Jo Halka Halka Suroor' ]",
    favoriteAlbumPlaceholder: "[ Add favorite album / performance ]",
  },
  {
    id: "karan-aujla",
    name: "KARAN AUJLA",
    role: "Contemporary Punjabi / Rhythm / Lyricism",
    tagline: "Complex syncopation, relentless cadence, and modern grit.",
    listeningNote:
      "Unmatched rhythmic discipline and sharp vocal delivery. The way verses lock onto drums teaches a masterclass in tension and release.",
    tempo: "HIGH-PUNCH CADENCE · 94 BPM",
    waveformPattern: [0.8, 0.95, 0.4, 0.85, 0.9, 0.3, 0.75, 0.95, 0.85, 0.4, 0.7],
    favoriteTrackPlaceholder: "[ Add favorite track, e.g. 'Making Memories' / 'Four Me' ]",
    favoriteAlbumPlaceholder: "[ Add favorite album, e.g. 'Making Memories' ]",
  },
  {
    id: "krsna",
    name: "KRSNA",
    role: "Hip-Hop / Technical Lyricism / Meter",
    tagline: "Multisyllabic rhyme schemes and mathematical flow.",
    listeningNote:
      "Precision writing where every syllable lands with exact mechanical intent. Great fuel when building modular systems that demand total accuracy.",
    tempo: "PRECISION METER · 90-98 BPM",
    waveformPattern: [0.9, 0.85, 0.95, 0.7, 0.88, 0.92, 0.65, 0.98, 0.82, 0.9, 0.85],
    favoriteTrackPlaceholder: "[ Add favorite track, e.g. 'No Cap' / 'Still Here' ]",
    favoriteAlbumPlaceholder: "[ Add favorite project, e.g. 'Still Here' / 'Far From Over' ]",
  },
  {
    id: "raftaar",
    name: "RAFTAAR",
    role: "Desi Hip-Hop / Speed / Production",
    tagline: "Raw sonic power, vocal elasticity, and heavy bounce.",
    listeningNote:
      "High energy beats and technical rhyme structures that push creative pace during intense shipping sprints.",
    tempo: "DYNAMIC VELOCITY · 110-130 BPM",
    waveformPattern: [0.65, 0.8, 0.9, 0.95, 0.7, 0.85, 0.9, 0.75, 0.88, 0.6, 0.4],
    favoriteTrackPlaceholder: "[ Add favorite track / project ]",
    favoriteAlbumPlaceholder: "[ Add favorite album / EP, e.g. 'Mr. Nair' / 'Hard Drive' ]",
  },
  {
    id: "king",
    name: "KING",
    role: "Melodic Hip-Hop / Pop / Atmosphere",
    tagline: "Cinematic hooks, atmospheric soundscapes, and melody.",
    listeningNote:
      "Lush production and melodic openness. Perfect for late evening editing sessions when textures need room to breathe.",
    tempo: "MELODIC DRIFT · 86-105 BPM",
    waveformPattern: [0.4, 0.6, 0.75, 0.7, 0.85, 0.8, 0.65, 0.7, 0.55, 0.45, 0.35],
    favoriteTrackPlaceholder: "[ Add favorite track, e.g. 'Maan Meri Jaan' / 'Champagne Talk' ]",
    favoriteAlbumPlaceholder: "[ Add favorite album, e.g. 'Champagne Talk' / 'New Life' ]",
  },
];
