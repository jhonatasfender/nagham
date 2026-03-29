import { useEffect, useRef } from "react";
import { drawStaff } from "./drawStaff";
import { createSampleMatrix } from "../../domain/notationMatrix";

const DEFAULT_WIDTH = 864;
const DEFAULT_HEIGHT = 360;

export function StaffView({ selectedNote, onSelectNote, scoreMatrix }) {
  const containerRef = useRef(null);

  useEffect(() => {
    drawStaff(
      containerRef.current,
      { selectedNote, scoreMatrix: scoreMatrix ?? createSampleMatrix() },
      {
        onSelectNote,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      }
    );
  }, [selectedNote, onSelectNote, scoreMatrix]);

  return (
    <div
      className="staff-view max-w-full overflow-hidden"
      ref={containerRef}
      style={{
        width: DEFAULT_WIDTH,
        maxWidth: "100%",
        height: DEFAULT_HEIGHT,
      }}
    />
  );
}
