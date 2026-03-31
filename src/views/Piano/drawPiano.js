import * as d3 from "d3";
import { noteToMidi } from "../../domain/notes";
import {
  getWhiteKeys,
  getBlackKeys,
  BLACK_KEY_NAMES,
  resolvePianoOctaves,
} from "../../domain/pianoKeys";
import {
  TRIAD_FILL,
  TRIAD_STROKE,
  SELECTED_FILL,
  SELECTED_STROKE,
} from "../Guitar/constants.js";

const BLACK_WIDTH_RATIO = 0.58;
const MIN_WHITE_KEY_PX = 38;
const KEYBOARD_PAD_X = 6;
const WHITE_KEY_RX = 3;
const BLACK_KEY_RX = 2;
const WHITE_TOP_INSET = 2;

const WHITE_KEY_DEFAULT_FILL = "var(--piano-key-white, #fafafa)";
const WHITE_KEY_DEFAULT_STROKE = "var(--piano-key-stroke, #d4d4d8)";
const BLACK_KEY_DEFAULT_FILL = "var(--piano-key-black, #27272a)";
const BLACK_KEY_DEFAULT_STROKE = "var(--piano-key-stroke, #71717a)";

const WHITE_NEIGHBOR_LEFT_OF_BLACK = ["C", "D", "F", "G", "A"];
const WHITE_NEIGHBOR_RIGHT_OF_BLACK = ["D", "E", "G", "A", "B"];

function keyBaseStyle(isBlackKey, defaultFill, defaultStroke) {
  const surfaceModifier = isBlackKey ? "piano-key--black" : "piano-key--white";
  return {
    className: `piano-key ${surfaceModifier}`,
    fill: defaultFill,
    stroke: defaultStroke,
    strokeWidth: 1,
  };
}

function isKeyInChord(chordNotes, keyName, keyOctave) {
  if (!chordNotes?.length) return false;
  const keyMidi = noteToMidi(keyName, keyOctave);
  return chordNotes.some(
    (note) => noteToMidi(note.name, note.octave) === keyMidi
  );
}

function isKeySelected(selectedNote, keyName, keyOctave) {
  if (!selectedNote || selectedNote.octave == null) return false;
  return (
    noteToMidi(selectedNote.name, selectedNote.octave) ===
    noteToMidi(keyName, keyOctave)
  );
}

function computeWhiteKeyLayout(whiteKeys, viewportWidthPx) {
  const whiteKeyCount = whiteKeys.length;
  const horizontalPad = KEYBOARD_PAD_X;
  const minSvgWidth =
    2 * horizontalPad + whiteKeyCount * MIN_WHITE_KEY_PX * 1.06;
  const svgContentWidth = Math.max(viewportWidthPx, minSvgWidth);

  const whiteKeyScale = d3
    .scaleBand()
    .domain(whiteKeys.map((k) => k.key))
    .range([horizontalPad, svgContentWidth - horizontalPad])
    .paddingInner(0.04)
    .paddingOuter(0);

  const whiteKeyWidth = whiteKeyScale.bandwidth();
  const whiteKeyLeftXByKeyId = new Map(
    whiteKeys.map((k) => [k.key, whiteKeyScale(k.key) ?? 0])
  );

  return { whiteKeyWidth, whiteKeyLeftXByKeyId, svgContentWidth };
}

export function drawPiano(container, data, options = {}) {
  if (!container) return;

  const { chordNotes, selectedNote } = data;
  const { onSelectNote, width: containerWidth = 800, height = 160 } = options;

  d3.select(container).selectAll("*").remove();

  const measuredWidth = Math.round(container.getBoundingClientRect().width);
  const viewportWidthPx =
    measuredWidth > 0 ? measuredWidth : Math.round(containerWidth);

  const visibleOctaves = resolvePianoOctaves(chordNotes);
  const whiteKeys = getWhiteKeys(visibleOctaves);
  const blackKeys = getBlackKeys(visibleOctaves);

  const whiteKeyBodyHeight = height - WHITE_TOP_INSET;
  const { whiteKeyWidth, whiteKeyLeftXByKeyId, svgContentWidth } =
    computeWhiteKeyLayout(whiteKeys, viewportWidthPx);

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [0, 0, svgContentWidth, height])
    .attr("width", svgContentWidth)
    .attr("height", height)
    .attr("class", "piano-keyboard-svg")
    .style("display", "block")
    .style("max-width", "none")
    .style("overflow", "visible");

  const noteIsInChord = (key) => isKeyInChord(chordNotes, key.name, key.octave);

  const keyboardScrollGroup = svg
    .append("g")
    .attr("class", "piano-scroll-layer");

  const whiteKeysGroup = keyboardScrollGroup
    .append("g")
    .attr("class", "piano-white-keys");
  whiteKeysGroup
    .selectAll("rect")
    .data(whiteKeys)
    .join("rect")
    .each(function (whiteKey) {
      const style = keyBaseStyle(
        false,
        WHITE_KEY_DEFAULT_FILL,
        WHITE_KEY_DEFAULT_STROKE
      );
      d3.select(this)
        .attr("x", whiteKeyLeftXByKeyId.get(whiteKey.key) ?? 0)
        .attr("y", WHITE_TOP_INSET)
        .attr("width", whiteKeyWidth)
        .attr("height", whiteKeyBodyHeight)
        .attr("rx", WHITE_KEY_RX)
        .attr("ry", WHITE_KEY_RX)
        .attr("data-key", whiteKey.key)
        .attr("class", style.className)
        .attr("fill", style.fill)
        .attr("stroke", style.stroke)
        .attr("stroke-width", style.strokeWidth)
        .style("cursor", "pointer");
    })
    .on("click", (_, whiteKey) =>
      onSelectNote?.({ name: whiteKey.name, octave: whiteKey.octave })
    );

  const blackKeyWidth = whiteKeyWidth * BLACK_WIDTH_RATIO;
  const blackKeyHeight = height * 0.58;

  const blackKeysGroup = keyboardScrollGroup
    .append("g")
    .attr("class", "piano-black-keys");
  blackKeys.forEach((blackKey) => {
    const blackNameIndex = BLACK_KEY_NAMES.indexOf(blackKey.name);
    if (blackNameIndex === -1) return;
    const leftWhiteName = WHITE_NEIGHBOR_LEFT_OF_BLACK[blackNameIndex];
    const rightWhiteName = WHITE_NEIGHBOR_RIGHT_OF_BLACK[blackNameIndex];
    const leftWhiteKeyLeftX =
      whiteKeyLeftXByKeyId.get(`${leftWhiteName}${blackKey.octave}`) ?? 0;
    const rightWhiteKeyLeftX =
      whiteKeyLeftXByKeyId.get(`${rightWhiteName}${blackKey.octave}`) ?? 0;
    const blackKeyLeftX =
      (leftWhiteKeyLeftX + rightWhiteKeyLeftX + whiteKeyWidth) / 2 -
      blackKeyWidth / 2;
    if (blackKeyLeftX < 0 || blackKeyLeftX + blackKeyWidth > svgContentWidth)
      return;
    const blackKeyStyle = keyBaseStyle(
      true,
      BLACK_KEY_DEFAULT_FILL,
      BLACK_KEY_DEFAULT_STROKE
    );
    const blackKeyRect = blackKeysGroup
      .append("rect")
      .attr("x", blackKeyLeftX)
      .attr("y", WHITE_TOP_INSET)
      .attr("width", blackKeyWidth)
      .attr("height", blackKeyHeight)
      .attr("rx", BLACK_KEY_RX)
      .attr("ry", BLACK_KEY_RX)
      .attr("class", blackKeyStyle.className)
      .attr("fill", blackKeyStyle.fill)
      .attr("stroke", blackKeyStyle.stroke)
      .attr("stroke-width", blackKeyStyle.strokeWidth)
      .style("cursor", "pointer");
    blackKeyRect
      .attr("data-key", blackKey.key)
      .on("click", () =>
        onSelectNote?.({ name: blackKey.name, octave: blackKey.octave })
      );
  });

  const chordDotRadius = Math.min(
    whiteKeyWidth * 0.34,
    whiteKeyBodyHeight * 0.13,
    11
  );
  const chordDotsGroup = keyboardScrollGroup
    .append("g")
    .attr("class", "piano-chord-dots");

  whiteKeys.forEach((whiteKey) => {
    if (!noteIsInChord(whiteKey)) return;
    const whiteKeyLeftX = whiteKeyLeftXByKeyId.get(whiteKey.key) ?? 0;
    const dotCenterX = whiteKeyLeftX + whiteKeyWidth / 2;
    const dotCenterY = WHITE_TOP_INSET + whiteKeyBodyHeight * 0.78;
    const isSelected = isKeySelected(
      selectedNote,
      whiteKey.name,
      whiteKey.octave
    );
    chordDotsGroup
      .append("circle")
      .attr("class", "piano-chord-dot")
      .attr("cx", dotCenterX)
      .attr("cy", dotCenterY)
      .attr("r", chordDotRadius)
      .attr("fill", isSelected ? SELECTED_FILL : TRIAD_FILL)
      .attr("stroke", isSelected ? SELECTED_STROKE : TRIAD_STROKE)
      .attr("stroke-width", 1.5)
      .style("pointer-events", "none");
  });

  blackKeys.forEach((blackKey) => {
    if (!noteIsInChord(blackKey)) return;
    const blackNameIndex = BLACK_KEY_NAMES.indexOf(blackKey.name);
    if (blackNameIndex === -1) return;
    const leftWhiteName = WHITE_NEIGHBOR_LEFT_OF_BLACK[blackNameIndex];
    const rightWhiteName = WHITE_NEIGHBOR_RIGHT_OF_BLACK[blackNameIndex];
    const leftWhiteKeyLeftX =
      whiteKeyLeftXByKeyId.get(`${leftWhiteName}${blackKey.octave}`) ?? 0;
    const rightWhiteKeyLeftX =
      whiteKeyLeftXByKeyId.get(`${rightWhiteName}${blackKey.octave}`) ?? 0;
    const blackKeyLeftX =
      (leftWhiteKeyLeftX + rightWhiteKeyLeftX + whiteKeyWidth) / 2 -
      blackKeyWidth / 2;
    if (blackKeyLeftX < 0 || blackKeyLeftX + blackKeyWidth > svgContentWidth)
      return;
    const dotCenterX = blackKeyLeftX + blackKeyWidth / 2;
    const dotCenterY = WHITE_TOP_INSET + blackKeyHeight * 0.52;
    const isSelected = isKeySelected(
      selectedNote,
      blackKey.name,
      blackKey.octave
    );
    const blackKeyDotRadius = Math.min(
      chordDotRadius * 0.92,
      blackKeyWidth * 0.38
    );
    chordDotsGroup
      .append("circle")
      .attr("class", "piano-chord-dot")
      .attr("cx", dotCenterX)
      .attr("cy", dotCenterY)
      .attr("r", blackKeyDotRadius)
      .attr("fill", isSelected ? SELECTED_FILL : TRIAD_FILL)
      .attr("stroke", isSelected ? SELECTED_STROKE : TRIAD_STROKE)
      .attr("stroke-width", 1.5)
      .style("pointer-events", "none");
  });

  return svg;
}
