import { useEffect, useRef, useState } from "react";
import { drawGuitar } from "./drawGuitar";
import { FretboardTable } from "./FretboardTable";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 220;

export function GuitarView({
  selectedNote,
  onSelectNote,
  chordNotes,
  root,
  quality,
  showTable = true,
  customPositions,
  customBarre,
  onPositionClick,
  isEditor = false,
}) {
  const containerRef = useRef(null);
  const [svgSize, setSvgSize] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      setSvgSize({
        width:
          w > 0
            ? Math.min(Math.round(w * 100) / 100, DEFAULT_WIDTH)
            : DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    drawGuitar(
      containerRef.current,
      { selectedNote, chordNotes, root, quality, customPositions, customBarre },
      {
        onSelectNote,
        onPositionClick,
        width: svgSize.width,
        height: svgSize.height,
        isEditor,
      }
    );
  }, [
    selectedNote,
    onSelectNote,
    chordNotes,
    root,
    quality,
    svgSize,
    customPositions,
    customBarre,
    onPositionClick,
    isEditor,
  ]);

  return (
    <div className="space-y-4">
      {showTable && (
        <FretboardTable
          selectedNote={selectedNote}
          onSelectNote={onSelectNote}
          chordNotes={chordNotes}
        />
      )}
      <div
        className="guitar-view max-w-full overflow-hidden"
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT,
        }}
      />
    </div>
  );
}
