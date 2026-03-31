import { STRING_COUNT } from "../../domain/fretboardMatrix";
import {
  TRIAD_FILL,
  TRIAD_STROKE,
  SELECTED_FILL,
  SELECTED_STROKE,
} from "./constants";
import { getStringY, getFretCenterX } from "./layout";

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
      const showDot =
        (isEditor && isCustomPosition && !isInBarre) ||
        (!isEditor && isChord && fret > 0 && !isInBarre);
      const isSelectedInChord = isChord && isSelected && fret > 0 && !isInBarre;

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
          circle.on("click", (e) => {
            e.stopPropagation();
            onPositionClick(stringIndex, fret);
          });
        } else if (!isEditor && onSelectNote) {
          const note = matrix[stringIndex][fret];
          circle.on("click", (e) => {
            e.stopPropagation();
            onSelectNote({ name: note.name, octave: note.octave });
          });
        }
      }
    }
  }
}
