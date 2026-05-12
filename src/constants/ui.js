// UI constants shared across instrument views (piano, staff, guitar).
// View-specific constants stay in their respective module
// (e.g. src/views/Guitar/constants.js has PADDING and NUT_WIDTH).

// Minimum tappable size for a single piano white key, in CSS pixels.
// Drives the SVG content width so the keyboard is fingerable on mobile
// (44 px Apple HIG / 48 dp Material).
export const MIN_WHITE_KEY_PX = 48;

// Minimum tappable size for a single guitar fret column, same rationale.
export const MIN_FRET_PX = 40;

// Highlight colors for chord-tones ("triad") and the user-selected note.
// Used by piano, guitar and (indirectly via CSS variables) staff. The
// variables fall back to the hex when the host page doesn't override.
export const TRIAD_FILL = "var(--guitar-dot-triad, #f59e0b)";
export const TRIAD_STROKE = "var(--guitar-dot-triad-stroke, #b45309)";
export const SELECTED_FILL = "var(--guitar-dot-selected, #fb923c)";
export const SELECTED_STROKE = "var(--guitar-dot-selected-stroke, #ea580c)";
