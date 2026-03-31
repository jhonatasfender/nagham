import { useEffect, useLayoutEffect, useRef } from "react";
import { VIEW_MAX_WIDTH } from "../../constants/layout.js";
import { useContainerSize } from "../../hooks/useContainerSize.js";
import { createSampleMatrix } from "../../domain/notationMatrix";
import { applyStaffNoteSelection, drawStaff } from "./drawStaff";

const DEFAULT_HEIGHT = 250;

export function StaffView({ selectedNote, onSelectNote, scoreMatrix }) {
  const containerRef = useRef(null);
  const containerWidth = useContainerSize(containerRef);
  const idToNoteRef = useRef(new Map());
  const onSelectNoteRef = useRef(onSelectNote);
  const selectedNoteRef = useRef(selectedNote);

  useLayoutEffect(() => {
    onSelectNoteRef.current = onSelectNote;
    selectedNoteRef.current = selectedNote;
  });

  useEffect(() => {
    let disposed = false;
    const container = containerRef.current;
    if (!container) return undefined;

    idToNoteRef.current = new Map();

    drawStaff(
      container,
      {
        selectedNote: selectedNoteRef.current,
        scoreMatrix: scoreMatrix ?? createSampleMatrix(),
      },
      {
        onSelectNote: (note) => onSelectNoteRef.current?.(note),
        width: containerWidth,
        height: DEFAULT_HEIGHT,
      }
    )
      .then((result) => {
        if (disposed || !result?.idToNote) return;
        idToNoteRef.current = result.idToNote;
        applyStaffNoteSelection(
          container,
          result.idToNote,
          selectedNoteRef.current
        );
      })
      .catch((error) => {
        if (!disposed) {
          console.error("Failed to render staff with Verovio", error);
        }
      });

    return () => {
      disposed = true;
    };
  }, [scoreMatrix, containerWidth]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || idToNoteRef.current.size === 0) return;
    applyStaffNoteSelection(container, idToNoteRef.current, selectedNote);
  }, [selectedNote]);

  return (
    <div
      className="staff-view max-w-full overflow-hidden"
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: VIEW_MAX_WIDTH,
        height: DEFAULT_HEIGHT,
      }}
    />
  );
}
