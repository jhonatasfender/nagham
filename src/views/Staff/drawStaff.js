import * as d3 from "d3";
import { noteToMidi, midiToNote } from "../../domain/notes";
import { createSampleMatrix, iterateNotes } from "../../domain/notationMatrix";
import {
  trebleMidiToY,
  trebleYToMidi,
  midiToTreblePosition,
  treblePositionToY,
  treblePositionToMidi,
} from "../../domain/staffPositions";

const PADDING = { top: 60, right: 24, bottom: 60, left: 24 };
const CLEF_WIDTH = 56;
const KEY_SIG_WIDTH = 32;
const BAR_LINE_GAP = 8;
const NOTE_HEAD_R = 11;
const NOTE_HEAD_W = 22;
const STEM_HEIGHT = 56;
const STAFF_HEIGHT = 120;
const LEDGER_LINE_WIDTH = 36;

export function drawStaff(container, data, options = {}) {
  if (!container) return;

  const { selectedNote, scoreMatrix } = data;
  const score = scoreMatrix ?? createSampleMatrix();
  const { onSelectNote, width = 864, height = 360 } = options;

  d3.select(container).selectAll("*").remove();

  const innerWidth = width - PADDING.left - PADDING.right;
  const staffTop = PADDING.top;
  const staffBottom = staffTop + STAFF_HEIGHT;
  const getY = (midi) => trebleMidiToY(midi, staffTop, staffBottom);

  const measureCount = score.measures.length;
  const beatsPerMeasure = score.timeSignature?.count ?? 4;
  const measureWidth = innerWidth / measureCount;
  const beatWidth = measureWidth / beatsPerMeasure;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet");

  const staffLeft =
    PADDING.left +
    CLEF_WIDTH +
    (score.keySignature?.sharps ? KEY_SIG_WIDTH : 0);
  const right = PADDING.left + innerWidth;
  const rectX = staffLeft;
  const rectY = PADDING.top;
  const rectWidth = Math.min(right - staffLeft, width - staffLeft);
  const rectHeight = Math.min(
    height - PADDING.top - PADDING.bottom,
    height - rectY
  );

  svg
    .append("rect")
    .attr("x", rectX)
    .attr("y", rectY)
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .attr("fill", "transparent")
    .style("cursor", "pointer")
    .on("click", function (event) {
      const [, py] = d3.pointer(event, this);
      const midi = Math.max(
        0,
        Math.min(127, trebleYToMidi(py, staffTop, staffBottom))
      );
      const note = midiToNote(midi);
      onSelectNote?.(note);
    });

  const gLines = svg
    .append("g")
    .attr("class", "staff-lines")
    .style("pointer-events", "none");
  for (let pos = 0; pos <= 8; pos += 2) {
    const y = treblePositionToY(pos, staffTop, staffBottom);
    gLines
      .append("line")
      .attr("x1", staffLeft)
      .attr("x2", right)
      .attr("y1", y)
      .attr("y2", y)
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2);
  }

  const clefLeft = PADDING.left + 8;
  const gLineY = treblePositionToY(2, staffTop, staffBottom);
  const clefFontSize = STAFF_HEIGHT * 1.1;
  svg
    .append("text")
    .attr("x", clefLeft)
    .attr("y", gLineY + clefFontSize * 0.15)
    .attr("font-size", clefFontSize)
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "middle")
    .style("pointer-events", "none")
    .text("𝄞");

  if (score.keySignature?.sharps > 0) {
    const sharpX = PADDING.left + CLEF_WIDTH + 10;
    const f5Y = getY(77);
    svg
      .append("text")
      .attr("x", sharpX)
      .attr("y", f5Y)
      .attr("font-size", 36)
      .attr("fill", "currentColor")
      .style("pointer-events", "none")
      .text("♯");
  }

  for (let i = 0; i <= measureCount; i++) {
    const x = staffLeft + i * measureWidth;
    svg
      .append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", staffTop - BAR_LINE_GAP)
      .attr("y2", staffBottom + BAR_LINE_GAP)
      .attr("stroke", "currentColor")
      .attr("stroke-width", i === 0 ? 3 : 2)
      .style("pointer-events", "none");
  }

  const selectedMidi =
    selectedNote && selectedNote.octave != null
      ? noteToMidi(selectedNote.name, selectedNote.octave)
      : null;

  const chordGroups = new Map();
  for (const { measureIndex, staffId, beatIndex, note } of iterateNotes(
    score
  )) {
    if (staffId !== 0) continue;
    const key = `${measureIndex}-${beatIndex}`;
    if (!chordGroups.has(key)) chordGroups.set(key, []);
    chordGroups.get(key).push({ measureIndex, beatIndex, note });
  }

  chordGroups.forEach((notes) => {
    notes.sort((a, b) => a.note.midi - b.note.midi);
    const { measureIndex, beatIndex } = notes[0];
    const xCenter =
      staffLeft + measureIndex * measureWidth + (beatIndex + 0.5) * beatWidth;
    const ys = notes.map((n) => getY(n.note.midi));
    const yMin = Math.min(...ys);
    const stemX = xCenter + NOTE_HEAD_W / 2;
    const stemY1 = yMin;
    const stemY2 = yMin + STEM_HEIGHT;

    const allMidis = notes.map((n) => n.note.midi);
    const ledgerMidis = allMidis.filter((m) => {
      const pos = midiToTreblePosition(m);
      return pos < 0 || pos > 8;
    });
    const ledgerYs = [...new Set(ledgerMidis.map(getY))];
    ledgerYs.forEach((ledgerY) => {
      svg
        .append("line")
        .attr("class", "ledger-line")
        .attr("x1", xCenter - NOTE_HEAD_W / 2 - LEDGER_LINE_WIDTH / 2)
        .attr("x2", xCenter + NOTE_HEAD_W / 2 + LEDGER_LINE_WIDTH / 2)
        .attr("y1", ledgerY)
        .attr("y2", ledgerY)
        .attr("stroke", "currentColor")
        .attr("stroke-width", 1.5)
        .style("pointer-events", "none");
    });

    const gChord = svg
      .append("g")
      .attr("class", "staff-chord")
      .style("pointer-events", "none");
    gChord
      .append("line")
      .attr("x1", stemX)
      .attr("x2", stemX)
      .attr("y1", stemY1)
      .attr("y2", stemY2)
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2);

    notes.forEach(({ note }) => {
      const midi = note.midi;
      const y = getY(midi);
      const isSelected = selectedMidi !== null && midi === selectedMidi;

      const position = midiToTreblePosition(midi);
      const expectedMidi = treblePositionToMidi(position);
      const isAltered = midi !== expectedMidi;
      const accidental =
        note.accidental != null && note.accidental !== ""
          ? note.accidental
          : isAltered
            ? midi > expectedMidi
              ? "♯"
              : "♭"
            : null;

      const g = svg
        .append("g")
        .attr("class", "staff-note")
        .style("cursor", "pointer");

      if (accidental) {
        g.append("text")
          .attr("x", xCenter - NOTE_HEAD_W / 2 - 12)
          .attr("y", y + 8)
          .attr("font-size", 28)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(
            accidental === "sharp" || accidental === "#"
              ? "♯"
              : accidental === "flat" || accidental === "b"
                ? "♭"
                : accidental
          );
      }

      g.append("ellipse")
        .attr("cx", xCenter)
        .attr("cy", y)
        .attr("rx", NOTE_HEAD_W / 2)
        .attr("ry", NOTE_HEAD_R)
        .attr(
          "fill",
          isSelected ? "var(--staff-note-fill, #fbbf24)" : "currentColor"
        )
        .attr(
          "stroke",
          isSelected ? "var(--staff-note-stroke, #b45309)" : "currentColor"
        )
        .attr("stroke-width", 2);

      g.on("click", () => {
        const { name, octave } = midiToNote(midi);
        onSelectNote?.({ name, octave });
      });
    });
  });
}
