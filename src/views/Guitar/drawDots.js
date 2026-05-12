import { STRING_COUNT } from "../../domain/fretboardMatrix";
import {
  TRIAD_FILL,
  TRIAD_STROKE,
  SELECTED_FILL,
  SELECTED_STROKE,
} from "./constants";
import { getStringY, getFretCenterX } from "./layout";
import { computeStringStates, STRING_STATE } from "./markers";

export function drawDots(
  cells,
  VISIBLE_FRETS,
  matrix,
  chordKeys,
  selectedKeys,
  barre,
  isEditor,
  customPositions,
  displayIndexByString,
  rowHeight,
  fretWidth,
  onPositionClick,
  onSelectNote
) {
  const dotRadius = Math.min(fretWidth, rowHeight) * 0.28;

  const positions = isEditor && customPositions ? customPositions : null;
  const stringStates = computeStringStates({
    chordKeys: positions ? undefined : chordKeys,
    positions,
    barre,
  });

  for (let stringIndex = 0; stringIndex < STRING_COUNT; stringIndex++) {
    for (
      let displayFretIndex = 0;
      displayFretIndex < VISIBLE_FRETS.length;
      displayFretIndex++
    ) {
      const fret = VISIBLE_FRETS[displayFretIndex];
      const id = `${stringIndex}-${fret}`;
      const isChord = chordKeys.has(id);
      const isSelected = selectedKeys.has(id);
      const isInBarre =
        barre &&
        barre.strings &&
        fret === barre.fret &&
        barre.strings.includes(stringIndex);
      const isCustomPosition =
        isEditor &&
        customPositions &&
        customPositions.some(([s, f]) => s === stringIndex && f === fret);
      // Open-string notes (fret === 0) are valid chord tones and must
      // render — many standard open voicings (C, G, Em, Dsus2, Asus2, ...)
      // depend on them. The dot renders inside the nut column.
      const isOpenStringDot =
        fret === 0 && stringStates.get(stringIndex) === STRING_STATE.OPEN;
      const showDot =
        !isOpenStringDot &&
        ((isEditor && isCustomPosition && !isInBarre) ||
          (!isEditor && isChord && !isInBarre));
      const isSelectedInChord = isChord && isSelected && !isInBarre;

      if (showDot) {
        const x = getFretCenterX(displayFretIndex, VISIBLE_FRETS, fretWidth);
        const y = getStringY(stringIndex, displayIndexByString, rowHeight);

        const circle = cells
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", dotRadius)
          .attr(
            "fill",
            isCustomPosition
              ? SELECTED_FILL
              : isSelectedInChord
                ? SELECTED_FILL
                : TRIAD_FILL
          )
          .attr(
            "stroke",
            isCustomPosition
              ? SELECTED_STROKE
              : isSelectedInChord
                ? SELECTED_STROKE
                : TRIAD_STROKE
          )
          .attr("stroke-width", 1.5)
          .style(
            "cursor",
            isEditor ? "pointer" : onSelectNote ? "pointer" : "default"
          )
          .raise();

        if (isEditor && onPositionClick) {
          circle.on("pointerdown", (e) => {
            e.stopPropagation();
            onPositionClick(stringIndex, fret);
          });
        } else if (!isEditor && onSelectNote) {
          const note = matrix[stringIndex][fret];
          circle.on("pointerdown", (e) => {
            e.stopPropagation();
            onSelectNote({ name: note.name, octave: note.octave });
          });
        }
      }
    }
  }

  // Render open-string outline / muted-string × marker at the fret 0 column.
  // Only when fret 0 is part of VISIBLE_FRETS (always true for the standard
  // visible range, but defensive).
  const openCol = VISIBLE_FRETS.indexOf(0);
  if (openCol !== -1) {
    const xOpen = getFretCenterX(openCol, VISIBLE_FRETS, fretWidth);
    for (let stringIndex = 0; stringIndex < STRING_COUNT; stringIndex++) {
      const state = stringStates.get(stringIndex);
      if (state !== STRING_STATE.OPEN && state !== STRING_STATE.MUTED) continue;

      const y = getStringY(stringIndex, displayIndexByString, rowHeight);

      if (state === STRING_STATE.OPEN) {
        cells
          .append("circle")
          .attr("cx", xOpen)
          .attr("cy", y)
          .attr("r", dotRadius)
          .attr("fill", "none")
          .attr("stroke", TRIAD_FILL)
          .attr("stroke-width", 1.5)
          .style("pointer-events", "none")
          .raise();
      } else {
        // muted
        cells
          .append("text")
          .attr("x", xOpen)
          .attr("y", y)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-size", Math.max(10, dotRadius * 1.4))
          .attr("font-weight", "700")
          .attr("fill", "#888")
          .style("pointer-events", "none")
          .text("×")
          .raise();
      }
    }
  }
}
