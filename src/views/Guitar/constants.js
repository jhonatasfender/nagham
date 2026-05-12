// Guitar-specific layout. Cross-instrument constants live in
// src/constants/ui.js and are re-exported here for back-compat with
// existing imports.
export const PADDING = { top: 8, right: 16, bottom: 24, left: 16 };
export const NUT_WIDTH = 10;
export const DEFAULT_VISIBLE_FRETS = [0, 1, 2, 3, 4, 5];
export const FRETS_TO_SHOW = 6;

export const DISPLAY_STRING_ORDER = [0, 1, 2, 3, 4, 5];
export const OPEN_STRING_LABELS = ["E", "B", "G", "D", "A", "E"];

export {
  MIN_FRET_PX,
  TRIAD_FILL,
  TRIAD_STROKE,
  SELECTED_FILL,
  SELECTED_STROKE,
} from "../../constants/ui";
