import { useEffect, useRef } from "react";
import { VIEW_MAX_WIDTH } from "../../constants/layout.js";
import { useContainerSize } from "../../hooks/useContainerSize.js";
import { getChordVoicing, getBarreFromVoicing } from "../../domain/voicings";
import { drawGuitar } from "./drawGuitar";
import { FretboardTable } from "./FretboardTable";

const DEFAULT_HEIGHT = 220;

function computeCenterFret({
  chordNotes,
  root,
  quality,
  bass,
  customPositions,
  customBarre,
  variationIndex = 0,
}) {
  const frets = [];
  const voicing =
    root && quality
      ? getChordVoicing(root, quality, variationIndex, bass)
      : null;
  if (voicing) {
    voicing.forEach((p) => frets.push(p.fret));
    const barre = getBarreFromVoicing(root, quality, variationIndex, bass);
    if (barre?.fret != null) frets.push(barre.fret);
  } else if (customPositions?.length) {
    customPositions.forEach(([, f]) => frets.push(f));
    if (customBarre?.fret != null) frets.push(customBarre.fret);
  } else if (chordNotes?.length) {
    return null;
  }
  if (!frets.length) return null;
  const min = Math.min(...frets);
  const max = Math.max(...frets);
  return (min + max) / 2;
}

export function GuitarView({
  selectedNote,
  onSelectNote,
  chordNotes,
  root,
  quality,
  bass = null,
  showTable = true,
  customPositions,
  customBarre,
  onPositionClick,
  isEditor = false,
  syncGlobalSelection = true,
  variationIndex = 0,
}) {
  const globalOnSelectNote = syncGlobalSelection ? onSelectNote : undefined;
  const containerRef = useRef(null);
  const containerWidth = useContainerSize(containerRef);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const previousScrollLeft = el.scrollLeft;
    drawGuitar(
      el,
      {
        selectedNote,
        chordNotes,
        root,
        quality,
        bass,
        customPositions,
        customBarre,
        variationIndex,
      },
      {
        onSelectNote: globalOnSelectNote,
        onPositionClick,
        width: containerWidth,
        height: DEFAULT_HEIGHT,
        isEditor,
      }
    );
    el.scrollLeft = previousScrollLeft;
  }, [
    selectedNote,
    globalOnSelectNote,
    chordNotes,
    root,
    quality,
    bass,
    containerWidth,
    customPositions,
    customBarre,
    onPositionClick,
    isEditor,
    variationIndex,
  ]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const svg = el.querySelector("svg");
    if (!svg) return;
    const centerFret = computeCenterFret({
      chordNotes,
      root,
      quality,
      bass,
      customPositions,
      customBarre,
      variationIndex,
    });
    if (centerFret == null) return;

    requestAnimationFrame(() => {
      const contentWidth =
        parseFloat(svg.getAttribute("width")) || el.clientWidth;
      const viewWidth = el.clientWidth;
      if (contentWidth <= viewWidth) return;
      const visibleFretCount = 14;
      const fretPx = contentWidth / visibleFretCount;
      const targetX = (centerFret + 0.5) * fretPx;
      let nextScrollLeft = targetX - viewWidth / 2;
      const maxScroll = Math.max(0, contentWidth - viewWidth);
      nextScrollLeft = Math.max(0, Math.min(maxScroll, nextScrollLeft));
      el.scrollLeft = nextScrollLeft;
    });
  }, [
    chordNotes,
    root,
    quality,
    bass,
    customPositions,
    customBarre,
    containerWidth,
    variationIndex,
  ]);

  return (
    <div className="space-y-4 select-none">
      {showTable && (
        <FretboardTable
          selectedNote={selectedNote}
          onSelectNote={globalOnSelectNote}
          chordNotes={chordNotes}
          highlightGlobalSelection={syncGlobalSelection}
        />
      )}
      <div
        className="guitar-view max-w-full overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch]"
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: VIEW_MAX_WIDTH,
          height: DEFAULT_HEIGHT,
        }}
      />
    </div>
  );
}
