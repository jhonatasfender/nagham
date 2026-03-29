import { NUT_WIDTH } from "./constants";

export function drawNut(g, innerHeight) {
  g.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", NUT_WIDTH)
    .attr("height", innerHeight)
    .attr("fill", "var(--guitar-nut, #27272a)")
    .attr("stroke", "var(--guitar-nut-stroke, #52525b)")
    .attr("stroke-width", 1);
}
