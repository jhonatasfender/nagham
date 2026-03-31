import { useEffect, useRef } from "react";
import { VIEW_MAX_WIDTH } from "../../constants/layout.js";
import { useContainerSize } from "../../hooks/useContainerSize.js";
import { drawGuitar } from "./drawGuitar";
import { FretboardTable } from "./FretboardTable";

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
  syncGlobalSelection = true,
}) {
  const globalOnSelectNote = syncGlobalSelection ? onSelectNote : undefined;
  const containerRef = useRef(null);
  const containerWidth = useContainerSize(containerRef);

  useEffect(() => {
    drawGuitar(
      containerRef.current,
      { selectedNote, chordNotes, root, quality, customPositions, customBarre },
      {
        onSelectNote: globalOnSelectNote,
        onPositionClick,
        width: containerWidth,
        height: DEFAULT_HEIGHT,
        isEditor,
      }
    );
  }, [
    selectedNote,
    globalOnSelectNote,
    chordNotes,
    root,
    quality,
    containerWidth,
    customPositions,
    customBarre,
    onPositionClick,
    isEditor,
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
        className="guitar-view max-w-full overflow-hidden"
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
