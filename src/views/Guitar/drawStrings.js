import { NUT_WIDTH, DISPLAY_STRING_ORDER } from "./constants";
import { getStringY } from "./layout";

export function drawStrings(g, displayIndexByString, rowHeight, innerWidth) {
  const gStrings = g.append("g").attr("class", "guitar-strings");
  DISPLAY_STRING_ORDER.forEach((stringIndex) => {
    const y = getStringY(stringIndex, displayIndexByString, rowHeight);
    gStrings
      .append("line")
      .attr("x1", NUT_WIDTH)
      .attr("x2", innerWidth)
      .attr("y1", y)
      .attr("y2", y)
      .attr("stroke", "var(--guitar-string, #71717a)")
      .attr("stroke-width", 1);
  });
}
