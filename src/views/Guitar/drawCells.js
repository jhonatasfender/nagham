import * as d3 from "d3";
import { NUT_WIDTH } from "./constants";
import { STRING_COUNT } from "../../domain/fretboardMatrix";

export function drawCells(
  g,
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
  const cells = g.append("g").attr("class", "guitar-cells");

  for (let stringIndex = 0; stringIndex < STRING_COUNT; stringIndex++) {
    for (
      let displayFretIndex = 0;
      displayFretIndex < VISIBLE_FRETS.length;
      displayFretIndex++
    ) {
      const fret = VISIBLE_FRETS[displayFretIndex];
      const note = matrix[stringIndex][fret];
      const isCustomPosition =
        isEditor &&
        customPositions &&
        customPositions.some(([s, f]) => s === stringIndex && f === fret);

      const displayIndex = displayIndexByString.get(stringIndex);

      let cellX, cellWidth;
      if (displayFretIndex === 0) {
        cellX = 0;
        cellWidth = NUT_WIDTH;
      } else {
        cellX = NUT_WIDTH + (displayFretIndex - 1) * fretWidth;
        cellWidth = fretWidth;
      }

      const cell = cells
        .append("rect")
        .attr("x", cellX)
        .attr("y", displayIndex * rowHeight)
        .attr("width", cellWidth)
        .attr("height", rowHeight)
        .attr("fill", "transparent")
        .style("cursor", "pointer");

      if (isEditor && onPositionClick) {
        const isExistingPosition = isCustomPosition;
        cell
          .on("click", () => {
            onPositionClick(stringIndex, fret);
          })
          .on("mouseenter", function () {
            if (fret > 0) {
              if (isExistingPosition) {
                d3.select(this).attr("fill", "rgba(239, 68, 68, 0.2)");
              } else {
                d3.select(this).attr("fill", "rgba(251, 146, 60, 0.1)");
              }
            }
          })
          .on("mouseleave", function () {
            d3.select(this).attr("fill", "transparent");
          });
      } else {
        cell.on("click", () =>
          onSelectNote?.({ name: note.name, octave: note.octave })
        );
      }
    }
  }

  return cells;
}
