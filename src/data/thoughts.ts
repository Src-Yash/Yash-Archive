/**
 * Philosophical notebook fragments — personal reflections and thoughts.
 * Structured with clear placeholders so Yash can drop in his real journal
 * entries and thoughts without inventing quotes.
 */

export interface NotebookThought {
  id: string;
  fragmentNumber: string;
  dateOrContext: string;
  thought: string;
  editorialAnnotation: string;
  tag: string;
}

export const NOTEBOOK_THOUGHTS: NotebookThought[] = [
  {
    id: "thought-01",
    fragmentNumber: "FRAGMENT 01",
    dateOrContext: "LATE NIGHT NOTEBOOK",
    thought:
      "[ A thought worth keeping. Software is craft, but the craft is only ever in service of human clarity. ]",
    editorialAnnotation:
      "jotted down after deleting 200 lines of complicated state in favor of one quiet function",
    tag: "SIMPLICITY",
  },
  {
    id: "thought-02",
    fragmentNumber: "FRAGMENT 02",
    dateOrContext: "ON PACING & CINEMA",
    thought:
      "[ A thought worth keeping. Most things fail not from lack of effort, but from hurrying the cut. Good editing knows how to hold still. ]",
    editorialAnnotation:
      "borrowed from slow cinema and applied directly to screen transitions",
    tag: "TIMING",
  },
  {
    id: "thought-03",
    fragmentNumber: "FRAGMENT 03",
    dateOrContext: "MARGIN SKETCH",
    thought:
      "[ A thought worth keeping. Build things you actually want to live with on your own machine. ]",
    editorialAnnotation:
      "scrawled on paper before opening the terminal",
    tag: "INTENTION",
  },
  {
    id: "thought-04",
    fragmentNumber: "FRAGMENT 04",
    dateOrContext: "WALKING AT NIGHT",
    thought:
      "[ A thought worth keeping. The city is quietest when the code finally compiles without a warning. ]",
    editorialAnnotation:
      "written on the walk back home after 2 AM",
    tag: "OBSERVATION",
  },
];
