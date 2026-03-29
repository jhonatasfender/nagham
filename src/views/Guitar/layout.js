import { NUT_WIDTH, DISPLAY_STRING_ORDER } from "./constants";

export function createDisplayIndexMap() {
  return new Map(
    DISPLAY_STRING_ORDER.map((stringIndex, displayIndex) => [
      stringIndex,
      displayIndex,
    ])
  );
}

export function getStringY(stringIndex, displayIndexByString, rowHeight) {
  return (displayIndexByString.get(stringIndex) + 0.5) * rowHeight;
}

export function getFretCenterX(displayFretIndex, VISIBLE_FRETS, fretWidth) {
  const actualFret = VISIBLE_FRETS[displayFretIndex];
  if (actualFret === 0) {
    return NUT_WIDTH / 2;
  }
  return NUT_WIDTH + (actualFret - 0.5) * fretWidth;
}

export function calculateDimensions(width, height, VISIBLE_FRETS) {
  const PADDING = { top: 8, right: 16, bottom: 24, left: 16 };
  const NUT_WIDTH = 10;
  const STRING_COUNT = 6;

  const innerWidth = width - PADDING.left - PADDING.right;
  const innerHeight = height - PADDING.top - PADDING.bottom;
  const gridWidth = innerWidth - NUT_WIDTH;
  const FRETTED_COLUMNS = VISIBLE_FRETS.length - 1;
  const fretWidth =
    FRETTED_COLUMNS > 0 ? gridWidth / FRETTED_COLUMNS : gridWidth;
  const rowHeight = innerHeight / STRING_COUNT;

  return {
    innerWidth,
    innerHeight,
    gridWidth,
    fretWidth,
    rowHeight,
    FRETTED_COLUMNS,
  };
}
