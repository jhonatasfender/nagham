import * as d3 from "d3";
import {
  getWhiteKeys,
  getBlackKeys,
  BLACK_KEY_NAMES,
  resolvePianoOctaves,
} from "../../domain/pianoKeys";

const BLACK_WIDTH_RATIO = 0.6;
const MIN_WHITE_KEY_PX = 36;

const TRIAD_FILL = "#f59e0b";
const TRIAD_STROKE = "#b45309";

const WHITE_KEY_DEFAULT_FILL = "var(--piano-key-white, #fafafa)";
const WHITE_KEY_DEFAULT_STROKE = "var(--piano-key-stroke, #d4d4d8)";
const BLACK_KEY_DEFAULT_FILL = "var(--piano-key-black, #27272a)";
const BLACK_KEY_DEFAULT_STROKE = "var(--piano-key-stroke, #71717a)";

function keyHighlightStyle(inChord, defaultFill, defaultStroke) {
  if (inChord) {
    return {
      className: "piano-key piano-key--triad",
      fill: TRIAD_FILL,
      stroke: TRIAD_STROKE,
      strokeWidth: 2,
    };
  }
  return {
    className: "piano-key",
    fill: defaultFill,
    stroke: defaultStroke,
    strokeWidth: 1,
  };
}

function isKeyInChord(chordNotes, keyName, keyOctave) {
  if (!chordNotes?.length) return false;
  return chordNotes.some((n) => n.name === keyName && n.octave === keyOctave);
}

export function drawPiano(container, data, options = {}) {
  if (!container) return;

  const { chordNotes } = data;
  const { onSelectNote, width = 800, height = 160 } = options;

  d3.select(container).selectAll("*").remove();

  const octaves = resolvePianoOctaves(chordNotes);
  const whiteKeys = getWhiteKeys(octaves);
  const blackKeys = getBlackKeys(octaves);

  const contentWidth = Math.max(width, whiteKeys.length * MIN_WHITE_KEY_PX);

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "none")
    .style("overflow", "hidden");

  const whiteScale = d3
    .scaleBand()
    .domain(whiteKeys.map((k) => k.key))
    .range([0, contentWidth])
    .paddingInner(0.02);
  const whiteWidth = whiteScale.bandwidth();
  const keyHeight = height;

  const inChord = (d) => isKeyInChord(chordNotes, d.name, d.octave);

  const whiteStyle = (d) =>
    keyHighlightStyle(
      inChord(d),
      WHITE_KEY_DEFAULT_FILL,
      WHITE_KEY_DEFAULT_STROKE
    );

  const gWhite = svg.append("g").attr("class", "piano-white-keys");
  gWhite
    .selectAll("rect")
    .data(whiteKeys)
    .join("rect")
    .each(function (d) {
      const s = whiteStyle(d);
      d3.select(this)
        .attr("x", whiteScale(d.key))
        .attr("y", 0)
        .attr("width", whiteWidth)
        .attr("height", keyHeight)
        .attr("data-key", d.key)
        .attr("class", s.className)
        .attr("fill", s.fill)
        .attr("stroke", s.stroke)
        .attr("stroke-width", s.strokeWidth)
        .style("cursor", "pointer");
    })
    .on("click", (_, d) => onSelectNote?.({ name: d.name, octave: d.octave }));

  const blackWidth = whiteWidth * BLACK_WIDTH_RATIO;
  const blackHeight = keyHeight * 0.6;
  const leftWhiteForBlack = ["C", "D", "F", "G", "A"];
  const rightWhiteForBlack = ["D", "E", "G", "A", "B"];

  const gBlack = svg.append("g").attr("class", "piano-black-keys");
  blackKeys.forEach((d) => {
    const idx = BLACK_KEY_NAMES.indexOf(d.name);
    if (idx === -1) return;
    const leftWhite = leftWhiteForBlack[idx];
    const rightWhite = rightWhiteForBlack[idx];
    const xLeft = whiteScale(`${leftWhite}${d.octave}`);
    const xRight = whiteScale(`${rightWhite}${d.octave}`);
    const x = (xLeft + xRight + whiteWidth) / 2 - blackWidth / 2;
    if (x < 0 || x + blackWidth > contentWidth) return;
    const style = keyHighlightStyle(
      inChord(d),
      BLACK_KEY_DEFAULT_FILL,
      BLACK_KEY_DEFAULT_STROKE
    );
    const rect = gBlack
      .append("rect")
      .attr("x", x)
      .attr("y", 0)
      .attr("width", blackWidth)
      .attr("height", blackHeight)
      .attr("class", style.className)
      .attr("fill", style.fill)
      .attr("stroke", style.stroke)
      .attr("stroke-width", style.strokeWidth)
      .style("cursor", "pointer");
    rect
      .attr("data-key", d.key)
      .on("click", () => onSelectNote?.({ name: d.name, octave: d.octave }));
  });

  return svg;
}
