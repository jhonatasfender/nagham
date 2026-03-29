import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { TRIAD_KEYS } from "../../domain/pianoKeys";
import { drawPiano } from "./drawPiano";
import { getPianoChordVoicing } from "../../domain/pianoVoicings";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 160;

export function PianoView({
  selectedNote,
  onSelectNote,
  chordNotes,
  root,
  quality,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

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
      { chordNotes: notesToHighlight },
      {
        onSelectNote,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      }
    );
    svgRef.current = svg;
  }, [onSelectNote, notesToHighlight]);

  useEffect(() => {
    if (!selectedNote || !svgRef.current || selectedNote.octave == null) return;

    const svg = svgRef.current;
    if (!svg) return;

    requestAnimationFrame(() => {
      const keyName = `${selectedNote.name}${selectedNote.octave}`;
      const keyElement = svg.select(`rect[data-key="${keyName}"]`);

      if (keyElement.empty()) return;

      const keyX = parseFloat(keyElement.attr("x")) || 0;
      const keyWidth = parseFloat(keyElement.attr("width")) || 0;
      const keyCenter = keyX + keyWidth / 2;
      const viewWidth = DEFAULT_WIDTH;

      const gWhite = svg.select(".piano-white-keys");
      const gBlack = svg.select(".piano-black-keys");

      if (gWhite.empty() || gBlack.empty()) return;

      let targetTranslateX = -(keyCenter - viewWidth / 2);

      const allWhiteKeys = gWhite.selectAll("rect").nodes();
      if (allWhiteKeys.length > 0) {
        const lastKey = d3.select(allWhiteKeys[allWhiteKeys.length - 1]);
        const lastKeyX = parseFloat(lastKey.attr("x")) || 0;
        const lastKeyWidth = parseFloat(lastKey.attr("width")) || 0;
        const contentWidth = lastKeyX + lastKeyWidth;

        const minTranslate = -(contentWidth - viewWidth);
        const maxTranslate = 0;
        targetTranslateX = Math.max(
          minTranslate,
          Math.min(maxTranslate, targetTranslateX)
        );
      }

      gWhite.attr("transform", `translate(${targetTranslateX}, 0)`);
      gBlack.attr("transform", `translate(${targetTranslateX}, 0)`);
    });
  }, [selectedNote]);

  return (
    <div
      className="piano-view max-w-full overflow-hidden"
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      }}
    />
  );
}
