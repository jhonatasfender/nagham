import {
  NUT_WIDTH,
  DISPLAY_STRING_ORDER,
  OPEN_STRING_LABELS,
} from "./constants";
import { getStringY } from "./layout";

export function drawLabels(g, displayIndexByString, rowHeight) {
  const labelX = NUT_WIDTH / 2;
  DISPLAY_STRING_ORDER.forEach((stringIndex) => {
    g.append("text")
      .attr("x", labelX)
      .attr("y", getStringY(stringIndex, displayIndexByString, rowHeight))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "var(--guitar-label, #a1a1aa)")
      .attr("font-size", 10)
      .text(OPEN_STRING_LABELS[stringIndex]);
  });
}
