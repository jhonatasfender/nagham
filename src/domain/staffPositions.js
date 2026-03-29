const TREBLE_ANCHOR_MIDI = 64;
const TREBLE_ANCHOR_POSITION = 0;

export function midiToTreblePosition(midi) {
  const semitonesFromAnchor = midi - TREBLE_ANCHOR_MIDI;

  if (semitonesFromAnchor === 0) return 0;
  if (semitonesFromAnchor === 1) return 1;
  if (semitonesFromAnchor === 3) return 2;
  if (semitonesFromAnchor === 5) return 3;
  if (semitonesFromAnchor === 7) return 4;
  if (semitonesFromAnchor === 8) return 5;
  if (semitonesFromAnchor === 10) return 6;
  if (semitonesFromAnchor === 12) return 7;
  if (semitonesFromAnchor === 13) return 8;

  if (semitonesFromAnchor === -2) return -1;
  if (semitonesFromAnchor === -4) return -2;

  if (semitonesFromAnchor > 13) {
    const octavesAbove = Math.floor((semitonesFromAnchor - 13) / 12);
    const remainder = (semitonesFromAnchor - 13) % 12;
    let position = 8 + octavesAbove * 7;
    if (remainder >= 2) position += 1;
    if (remainder >= 4) position += 1;
    if (remainder >= 6) position += 1;
    if (remainder >= 7) position += 1;
    if (remainder >= 9) position += 1;
    if (remainder >= 11) position += 1;
    if (remainder >= 12) position += 1;
    return position;
  }

  if (semitonesFromAnchor < -4) {
    const semitonesBelowC4 = semitonesFromAnchor + 4;
    const octavesBelow = Math.floor(Math.abs(semitonesBelowC4) / 12);
    const remainder = Math.abs(semitonesBelowC4) % 12;
    let position = -2 - octavesBelow * 7;
    if (remainder >= 1) position -= 1;
    if (remainder >= 3) position -= 1;
    if (remainder >= 5) position -= 1;
    if (remainder >= 7) position -= 1;
    if (remainder >= 8) position -= 1;
    if (remainder >= 10) position -= 1;
    return position;
  }

  return Math.round(semitonesFromAnchor / 2);
}

export function treblePositionToY(position, staffTop, staffBottom) {
  const staffHeight = staffBottom - staffTop;
  const step = staffHeight / 8;
  return staffBottom - position * step;
}

export function trebleMidiToY(midi, staffTop, staffBottom) {
  const position = midiToTreblePosition(midi);
  return treblePositionToY(position, staffTop, staffBottom);
}

export function treblePositionToMidi(position) {
  const positionFromAnchor = position - TREBLE_ANCHOR_POSITION;

  if (positionFromAnchor === 0) return 64;
  if (positionFromAnchor === 1) return 65;
  if (positionFromAnchor === 2) return 67;
  if (positionFromAnchor === 3) return 69;
  if (positionFromAnchor === 4) return 71;
  if (positionFromAnchor === 5) return 72;
  if (positionFromAnchor === 6) return 74;
  if (positionFromAnchor === 7) return 76;
  if (positionFromAnchor === 8) return 77;

  if (positionFromAnchor === -1) return 62;
  if (positionFromAnchor === -2) return 60;

  if (positionFromAnchor > 8) {
    const octavesAbove = Math.floor((positionFromAnchor - 8) / 7);
    const remainder = (positionFromAnchor - 8) % 7;
    let midi = 77 + octavesAbove * 12;
    const semitoneOffsets = [2, 4, 6, 7, 9, 11, 12];
    if (remainder > 0 && remainder <= semitoneOffsets.length) {
      midi += semitoneOffsets[remainder - 1] - 2;
    }
    return midi;
  }

  if (positionFromAnchor < -2) {
    const octavesBelow = Math.floor(Math.abs(positionFromAnchor + 2) / 7);
    const remainder = Math.abs(positionFromAnchor + 2) % 7;
    let midi = 60 - octavesBelow * 12;
    const semitoneOffsets = [1, 3, 5, 7, 8, 10, 12];
    if (remainder > 0 && remainder <= semitoneOffsets.length) {
      midi -= semitoneOffsets[remainder - 1];
    }
    return Math.max(0, midi);
  }

  return TREBLE_ANCHOR_MIDI + Math.round(positionFromAnchor * 2);
}

export function trebleYToMidi(y, staffTop, staffBottom) {
  const staffHeight = staffBottom - staffTop;
  const step = staffHeight / 8;
  const position = (staffBottom - y) / step;
  const roundedPosition = Math.round(position);
  return treblePositionToMidi(roundedPosition);
}
