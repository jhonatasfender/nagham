import * as d3 from "d3";
import { getFretboardMatrix } from "../../domain/fretboardMatrix";
import { getBarreFromVoicing } from "../../domain/voicings";
import { PADDING } from "./constants";
import { detectBarre } from "./chordUtils";
import { calculateVisibleFrets } from "./visibleFrets";
import { createDisplayIndexMap, calculateDimensions } from "./layout";
import { drawNut } from "./drawNut";
import { drawStrings } from "./drawStrings";
import { drawFrets } from "./drawFrets";
import { drawLabels } from "./drawLabels";
import { getSelectedKeys } from "./getSelectedKeys";
import { getChordKeys } from "./getChordKeys";
import { drawCells } from "./drawCells";
import { drawDots } from "./drawDots";
import { drawBarre } from "./drawBarre";

export function drawGuitar(container, data, options = {}) {
  if (!container) return;

  const {
    selectedNote,
    chordNotes,
    root,
    quality,
    customPositions,
    customBarre,
  } = data;
  const {
    onSelectNote,
    onPositionClick,
    width = 500,
    height = 220,
    isEditor = false,
  } = options;

  d3.select(container).selectAll("*").remove();

  const matrix = getFretboardMatrix();
  const VISIBLE_FRETS = calculateVisibleFrets();
  const chordKeys = getChordKeys(
    isEditor,
    customPositions,
    chordNotes,
    root,
    quality,
    VISIBLE_FRETS
  );

  const barre = isEditor
    ? customBarre
      ? {
          fret: customBarre.fret,
          strings: customBarre.strings || [0, 1, 2, 3, 4, 5],
        }
      : null
    : root && quality
      ? getBarreFromVoicing(root, quality)
      : detectBarre(chordKeys, 12);

  const { innerWidth, innerHeight, fretWidth, rowHeight, FRETTED_COLUMNS } =
    calculateDimensions(width, height, VISIBLE_FRETS);

  const displayIndexByString = createDisplayIndexMap();

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet");

  const g = svg
    .append("g")
    .attr("transform", `translate(${PADDING.left}, ${PADDING.top})`);

  drawNut(g, innerHeight);
  drawStrings(g, displayIndexByString, rowHeight, innerWidth);
  drawFrets(g, innerHeight, FRETTED_COLUMNS, fretWidth);
  drawLabels(g, displayIndexByString, rowHeight);

  const selectedKeys = getSelectedKeys(selectedNote, VISIBLE_FRETS);

  const cells = drawCells(
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
  );

  drawDots(
    cells,
    VISIBLE_FRETS,
    chordKeys,
    selectedKeys,
    barre,
    isEditor,
    customPositions,
    displayIndexByString,
    rowHeight,
    fretWidth,
    onPositionClick
  );

  drawBarre(
    g,
    cells,
    barre,
    VISIBLE_FRETS,
    displayIndexByString,
    rowHeight,
    fretWidth
  );

  if (isEditor) {
    cells.selectAll("circle").raise();
  }
}
