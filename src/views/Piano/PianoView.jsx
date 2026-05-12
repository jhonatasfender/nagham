import { useEffect, useRef, useMemo } from "react";
import { VIEW_MAX_WIDTH } from "../../constants/layout.js";
import { useContainerSize } from "../../hooks/useContainerSize.js";
import { midiToNote, noteToMidi } from "../../domain/notes.js";
import { TRIAD_KEYS } from "../../domain/pianoKeys";
import { getPianoChordVoicing } from "../../domain/pianoVoicings";
import { drawPiano } from "./drawPiano";

const DEFAULT_HEIGHT = 192;

export function PianoView({
  selectedNote,
  onSelectNote,
  chordNotes,
  root,
  quality,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const containerWidth = useContainerSize(containerRef);

  const notesToHighlight = useMemo(() => {
    if (chordNotes?.length && root && quality) {
      const voicing = getPianoChordVoicing(root, quality);
      if (voicing) return voicing;
    }
    return chordNotes?.length ? chordNotes : TRIAD_KEYS;
  }, [chordNotes, root, quality]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const previousScrollLeft = el.scrollLeft;
    const svg = drawPiano(
      el,
      { chordNotes: notesToHighlight, selectedNote },
      {
        onSelectNote,
        width: containerWidth,
        height: DEFAULT_HEIGHT,
      }
    );
    svgRef.current = svg;
    el.scrollLeft = previousScrollLeft;
  }, [onSelectNote, notesToHighlight, selectedNote, containerWidth]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !svgRef.current) return;
    const svg = svgRef.current;

    const targetKeyName = (() => {
      if (selectedNote && selectedNote.octave != null) {
        const { name, octave } = midiToNote(
          noteToMidi(selectedNote.name, selectedNote.octave)
        );
        return `${name}${octave}`;
      }
      if (notesToHighlight?.length) {
        const midis = notesToHighlight
          .filter((n) => typeof n.octave === "number")
          .map((n) => noteToMidi(n.name, n.octave))
          .sort((a, b) => a - b);
        if (!midis.length) return null;
        const medianMidi = midis[Math.floor(midis.length / 2)];
        const { name, octave } = midiToNote(medianMidi);
        return `${name}${octave}`;
      }
      return null;
    })();

    if (!targetKeyName) return;

    requestAnimationFrame(() => {
      const keyElement = svg.select(`rect[data-key="${targetKeyName}"]`);
      if (keyElement.empty()) return;

      const keyX = parseFloat(keyElement.attr("x")) || 0;
      const keyWidth = parseFloat(keyElement.attr("width")) || 0;
      const keyCenter = keyX + keyWidth / 2;
      const viewWidth = el.clientWidth || containerWidth;
      const contentWidth = parseFloat(svg.attr("width")) || viewWidth;

      let nextScrollLeft = keyCenter - viewWidth / 2;
      const maxScroll = Math.max(0, contentWidth - viewWidth);
      nextScrollLeft = Math.max(0, Math.min(maxScroll, nextScrollLeft));
      el.scrollLeft = nextScrollLeft;
    });
  }, [selectedNote, containerWidth, notesToHighlight]);

  return (
    <div
      className="piano-view relative max-w-full overflow-x-auto overflow-y-hidden rounded-md bg-zinc-950/90 ring-1 ring-inset ring-zinc-600/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: VIEW_MAX_WIDTH,
        height: DEFAULT_HEIGHT,
      }}
    />
  );
}
