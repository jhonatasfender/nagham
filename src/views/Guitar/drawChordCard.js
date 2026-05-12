import * as d3 from "d3";
import {
  CHORD_CARD_WIDTH,
  CHORD_CARD_HEIGHT,
  CHORD_CARD_VISIBLE_FRETS,
  CHORD_CARD_MARGIN,
  TRIAD_FILL,
} from "./constants.js";

// stringIndex 0 = high E (right side of card)
// stringIndex 5 = low E  (left side of card)
const STRING_COUNT = 6;

function buildLayout(variation) {
  const { positions, barre } = variation;
  const allFrets = positions
    .map(([, f]) => f)
    .filter((f) => f > 0)
    .concat(barre ? [barre.fret] : []);
  const minPlayed = allFrets.length ? Math.min(...allFrets) : 1;
  const maxPlayed = allFrets.length ? Math.max(...allFrets) : 1;

  const hasOpen = positions.some(([, f]) => f === 0);
  const region = hasOpen || minPlayed <= 1 ? "open" : `fret-${minPlayed}`;

  const startFret = region === "open" ? 1 : minPlayed;
  const visible = CHORD_CARD_VISIBLE_FRETS;
  const endFret = Math.max(startFret + visible - 1, maxPlayed);

  return {
    region,
    startFret,
    endFret,
    span: endFret - startFret + 1,
  };
}

function stringX(stringIndex, gridWidth, marginLeft) {
  const col = STRING_COUNT - 1 - stringIndex; // low E on left
  const step = gridWidth / (STRING_COUNT - 1);
  return marginLeft + col * step;
}

function fretY(fretNumber, layout, gridTop, gridHeight) {
  const row = fretNumber - layout.startFret + 1;
  const step = gridHeight / layout.span;
  return gridTop + (row - 0.5) * step;
}

function fretLineY(fretIndex, gridTop, gridHeight, span) {
  const step = gridHeight / span;
  return gridTop + fretIndex * step;
}

export function drawChordCard(el, { variation, isSelected }, options = {}) {
  const width = options.width ?? CHORD_CARD_WIDTH;
  const height = options.height ?? CHORD_CARD_HEIGHT;
  const M = CHORD_CARD_MARGIN;

  d3.select(el).selectAll("svg").remove();
  if (!variation) return;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("aria-hidden", "true");

  if (isSelected) {
    svg
      .append("rect")
      .attr("x", 0.5)
      .attr("y", 0.5)
      .attr("width", width - 1)
      .attr("height", height - 1)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", "none")
      .attr("stroke", TRIAD_FILL)
      .attr("stroke-width", 2);
  }

  const layout = buildLayout(variation);
  const gridLeft = M.left;
  const gridRight = width - M.right;
  const gridTop = M.top;
  const gridBottom = height - M.bottom;
  const gridWidth = gridRight - gridLeft;
  const gridHeight = gridBottom - gridTop;

  const markerY = M.top - 6;
  for (let s = 0; s < STRING_COUNT; s++) {
    const positionsOnString = variation.positions.filter(([ps]) => ps === s);
    const onBarre = variation.barre?.strings?.includes(s);
    const x = stringX(s, gridWidth, gridLeft);
    if (positionsOnString.length === 0 && !onBarre) {
      svg
        .append("text")
        .attr("x", x)
        .attr("y", markerY)
        .attr("text-anchor", "middle")
        .attr("font-size", 9)
        .attr("fill", "#888")
        .text("×");
    } else if (positionsOnString.some(([, f]) => f === 0)) {
      svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", markerY - 2)
        .attr("r", 3.5)
        .attr("fill", "none")
        .attr("stroke", "#888")
        .attr("stroke-width", 1);
    }
  }

  for (let s = 0; s < STRING_COUNT; s++) {
    const x = stringX(s, gridWidth, gridLeft);
    svg
      .append("line")
      .attr("x1", x)
      .attr("y1", gridTop)
      .attr("x2", x)
      .attr("y2", gridBottom)
      .attr("stroke", "#666")
      .attr("stroke-width", 1);
  }

  for (let i = 0; i <= layout.span; i++) {
    const y = fretLineY(i, gridTop, gridHeight, layout.span);
    const isNutLine = i === 0 && layout.region === "open";
    svg
      .append("line")
      .attr("x1", gridLeft)
      .attr("y1", y)
      .attr("x2", gridRight)
      .attr("y2", y)
      .attr("stroke", isNutLine ? "#ccc" : "#555")
      .attr("stroke-width", isNutLine ? 3 : 1);
  }

  if (layout.region !== "open") {
    svg
      .append("text")
      .attr("x", gridLeft - 4)
      .attr("y", fretLineY(0.5, gridTop, gridHeight, layout.span) + 4)
      .attr("text-anchor", "end")
      .attr("font-size", 9)
      .attr("fill", "#aaa")
      .text(String(layout.startFret));
  }

  if (variation.barre) {
    const strings = variation.barre.strings ?? [];
    if (strings.length >= 1) {
      const xs = strings.map((s) => stringX(s, gridWidth, gridLeft));
      const xMin = Math.min(...xs);
      const xMax = Math.max(...xs);
      const y = fretY(variation.barre.fret, layout, gridTop, gridHeight);
      const r = 5;
      svg
        .append("rect")
        .attr("x", xMin - r)
        .attr("y", y - r)
        .attr("width", xMax - xMin + 2 * r)
        .attr("height", 2 * r)
        .attr("rx", r)
        .attr("ry", r)
        .attr("fill", TRIAD_FILL);
    }
  }

  for (const [s, f] of variation.positions) {
    if (f === 0) continue;
    const x = stringX(s, gridWidth, gridLeft);
    const y = fretY(f, layout, gridTop, gridHeight);
    svg
      .append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 5)
      .attr("fill", TRIAD_FILL);
  }
}
