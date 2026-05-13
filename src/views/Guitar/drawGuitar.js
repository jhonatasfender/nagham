import * as d3 from "d3";
import { getFretboardMatrix } from "../../domain/fretboardMatrix";
import { getBarreFromVoicing } from "../../domain/voicings";
import { PADDING, NUT_WIDTH, MIN_FRET_PX } from "./constants";
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
    bass = null,
    customPositions,
    customBarre,
    variationIndex = 0,
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
    VISIBLE_FRETS,
    variationIndex,
    bass
  );

  const barre = isEditor
    ? customBarre
      ? {
          fret: customBarre.fret,
          strings: customBarre.strings || [0, 1, 2, 3, 4, 5],
        }
      : null
    : root && quality
      ? getBarreFromVoicing(root, quality, variationIndex, bass)
      : detectBarre(chordKeys, 12);

  const minSvgContentWidth =
    PADDING.left +
    PADDING.right +
    NUT_WIDTH +
    (VISIBLE_FRETS.length - 1) * MIN_FRET_PX;
  const svgContentWidth = Math.max(width, minSvgContentWidth);

  const { innerWidth, innerHeight, fretWidth, rowHeight, FRETTED_COLUMNS } =
    calculateDimensions(svgContentWidth, height, VISIBLE_FRETS);

  const displayIndexByString = createDisplayIndexMap();

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [0, 0, svgContentWidth, height])
    .attr("width", svgContentWidth)
    .attr("height", height)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("display", "block")
    .style("touch-action", "manipulation");

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
