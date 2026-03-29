import { NUT_WIDTH } from "./constants";

export function drawFrets(g, innerHeight, FRETTED_COLUMNS, fretWidth) {
  const gFrets = g.append("g").attr("class", "guitar-frets");
  gFrets
    .append("line")
    .attr("x1", NUT_WIDTH)
    .attr("x2", NUT_WIDTH)
    .attr("y1", 0)
    .attr("y2", innerHeight)
    .attr("stroke", "var(--guitar-fret, #52525b)")
    .attr("stroke-width", 2);
  for (let i = 1; i <= FRETTED_COLUMNS; i++) {
    const x = NUT_WIDTH + i * fretWidth;
    gFrets
      .append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "var(--guitar-fret, #52525b)")
      .attr("stroke-width", 1);
  }
}
