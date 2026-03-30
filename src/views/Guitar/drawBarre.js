import { getStringY, getFretCenterX } from "./layout";

export function drawBarre(
  g,
  cells,
  barre,
  VISIBLE_FRETS,
  displayIndexByString,
  rowHeight,
  fretWidth
) {
  if (!barre || !barre.strings || barre.strings.length === 0) return;

  const fromString = barre.strings[0];
  const toString = barre.strings[barre.strings.length - 1];

  const fromStringY = getStringY(fromString, displayIndexByString, rowHeight);
  const toStringY = getStringY(toString, displayIndexByString, rowHeight);

  let barreX;

  const displayFretIndexForBarre = VISIBLE_FRETS.indexOf(barre.fret);
  if (displayFretIndexForBarre < 0) return;
  barreX = getFretCenterX(displayFretIndexForBarre, VISIBLE_FRETS, fretWidth);

  const barreStrokeWidth = 15;

  const barreLine = cells
    .append("line")
    .attr("x1", barreX)
    .attr("x2", barreX)
    .attr("y1", fromStringY)
    .attr("y2", toStringY)
    .attr("stroke", "var(--guitar-barre, #fb923c)")
    .attr("stroke-width", barreStrokeWidth)
    .attr("stroke-linecap", "round")
    .attr("opacity", 0.88);

  barreLine.lower();

  const fretNumberX = barreX;
  const fretNumberY = fromStringY + barreStrokeWidth / 2 + 10;

  g.append("text")
    .attr("x", fretNumberX)
    .attr("y", fretNumberY)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("fill", "var(--guitar-barre-fret-number, #fb923c)")
    .attr("font-size", 12)
    .attr("font-weight", "bold")
    .text(barre.fret);
}
