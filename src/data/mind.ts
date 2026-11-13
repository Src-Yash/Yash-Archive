export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  whyItStayed: string;
}

export interface MovieItem {
  id: string;
  title: string;
  director: string;
  year: string;
  ratio: string;
  palette: [string, string];
  whyItStayed: string;
}

export interface ThoughtItem {
  id: string;
  prompt: string;
  lines: string[];
  marginNote: string;
}

export const TRACKS: TrackItem[] = [
  {
    id: "spaces-frahm",
    title: "Says",
    artist: "Nils Frahm",
    album: "Spaces",
    duration: "08:16",
    whyItStayed:
      "Starts with a single quiet synth pulse and takes eight patient minutes to arrive. A reminder not to rush ideas before they are ready.",
  },
  {
    id: "async-sakamoto",
    title: "andata",
    artist: "Ryuichi Sakamoto",
    album: "async",
    duration: "04:28",
    whyItStayed:
      "The pauses between piano chords carry just as much weight as the notes themselves.",
  },
  {
    id: "remember-arnalds",
    title: "saman",
    artist: "Ólafur Arnalds",
    album: "re:member",
    duration: "02:13",
    whyItStayed:
      "Two minutes of felt piano for late nights when a feature refuses to click and you just need to step back.",
  },
  {
    id: "secret-life",
    title: "Cumbia",
    artist: "Fred again.. & Brian Eno",
    album: "Secret Life",
    duration: "03:44",
    whyItStayed:
      "Warm tape texture that feels like a streetlamp through a train window at 1 AM.",
  },
];

export const QUIET_PLAYLISTS = [
  "02:00 AM Architecture — felt piano & tape loops",
  "Frame by Frame — percussive scores while editing",
  "Zero Lyrics — ambient rooms for reading unfamiliar code",
];

export const MOVIES: MovieItem[] = [
  {
    id: "in-the-mood-for-love",
    title: "In the Mood for Love",
    director: "Wong Kar-wai",
    year: "2000",
    ratio: "1.66 : 1",
    palette: ["#2A1316", "#6A232B"],
    whyItStayed:
      "Everything real happens in corridors, lingering close-ups, and sentences cut short. Taught me how much restraint can say.",
  },
  {
    id: "arrival",
    title: "Arrival",
    director: "Denis Villeneuve",
    year: "2016",
    ratio: "2.39 : 1",
    palette: ["#1E2124", "#4A5056"],
    whyItStayed:
      "A quiet film about how learning a new language alters the shape of time and memory.",
  },
  {
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    director: "Denis Villeneuve",
    year: "2017",
    ratio: "2.39 : 1",
    palette: ["#241C14", "#8F5A29"],
    whyItStayed:
      "Scale and silence sharing the exact same frame—every architectural shadow feels deliberate.",
  },
  {
    id: "aftersun",
    title: "Aftersun",
    director: "Charlotte Wells",
    year: "2022",
    ratio: "1.85 : 1",
    palette: ["#151D29", "#2D4263"],
    whyItStayed:
      "Memory editing itself through old camcorder frames and half-heard music days after you leave the theater.",
  },
];

export const THOUGHTS: ThoughtItem[] = [
  {
    id: "thought-becoming",
    prompt: "A THOUGHT I HAD WHILE DOING NOTHING.",
    lines: [
      "Maybe becoming better",
      "doesn't always mean",
      "becoming busier.",
    ],
    marginNote: "written down instead of opening another tab",
  },
  {
    id: "thought-trying",
    prompt: "NOTEBOOK MARGIN · PAGE 14",
    lines: [
      "Maybe we aren't afraid of failure.",
      "Maybe we're afraid of finding out",
      "what happens when we actually try.",
    ],
    marginNote: "on shipping imperfect work into daylight",
  },
  {
    id: "thought-silence",
    prompt: "ON INTERFACES & ROOMS",
    lines: [
      "Most screens feel loud",
      "because nobody trusted empty paper",
      "to hold someone's attention.",
    ],
    marginNote: "whitespace isn't empty; it lets the next sentence breathe",
  },
  {
    id: "thought-craft",
    prompt: "LATE NIGHT NOTE",
    lines: [
      "Taste is just curiosity",
      "given enough quiet hours",
      "to argue with itself.",
    ],
    marginNote: "on keeping curiosity wider than a resume",
  },
];
