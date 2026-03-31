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
      if (voicing) {
        return voicing;
      }
    }
    return chordNotes?.length ? chordNotes : TRIAD_KEYS;
  }, [chordNotes, root, quality]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
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
  }, [onSelectNote, notesToHighlight, selectedNote, containerWidth]);

  useEffect(() => {
    if (!selectedNote || !svgRef.current || selectedNote.octave == null) return;

    const svg = svgRef.current;
    if (!svg) return;

    requestAnimationFrame(() => {
      const { name, octave } = midiToNote(
        noteToMidi(selectedNote.name, selectedNote.octave)
      );
      const keyName = `${name}${octave}`;
      const keyElement = svg.select(`rect[data-key="${keyName}"]`);

      if (keyElement.empty()) return;

      const keyX = parseFloat(keyElement.attr("x")) || 0;
      const keyWidth = parseFloat(keyElement.attr("width")) || 0;
      const keyCenter = keyX + keyWidth / 2;
      const viewWidth = containerWidth;

      const gScroll = svg.select(".piano-scroll-layer");
      if (gScroll.empty()) return;

      let targetTranslateX = -(keyCenter - viewWidth / 2);

      const scrollWidth = parseFloat(svg.attr("width")) || viewWidth;
      const minTranslate =
        scrollWidth > viewWidth ? -(scrollWidth - viewWidth) : 0;
      const maxTranslate = 0;
      targetTranslateX = Math.max(
        minTranslate,
        Math.min(maxTranslate, targetTranslateX)
      );

      gScroll.attr("transform", `translate(${targetTranslateX}, 0)`);
    });
  }, [selectedNote, containerWidth, notesToHighlight]);

  return (
    <div
      className="piano-view relative max-w-full overflow-hidden rounded-md bg-zinc-950/90 ring-1 ring-inset ring-zinc-600/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: VIEW_MAX_WIDTH,
        height: DEFAULT_HEIGHT,
      }}
    />
  );
}
