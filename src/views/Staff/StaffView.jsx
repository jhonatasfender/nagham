import { useEffect, useRef } from "react";
import { drawStaff } from "./drawStaff";
import { createSampleMatrix } from "../../domain/notationMatrix";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 250;

export function StaffView({ selectedNote, onSelectNote, scoreMatrix }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    const container = containerRef.current;
    if (!container) return undefined;

    drawStaff(
      container,
      { selectedNote, scoreMatrix: scoreMatrix ?? createSampleMatrix() },
      {
        onSelectNote,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      }
    ).catch((error) => {
      if (!disposed) {
        console.error("Failed to render staff with Verovio", error);
      }
    });

    return () => {
      disposed = true;
    };
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
