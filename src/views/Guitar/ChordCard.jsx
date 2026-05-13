import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { drawChordCard } from "./drawChordCard";
import { CHORD_CARD_WIDTH, CHORD_CARD_HEIGHT } from "./constants.js";

export function ChordCard({
  variation,
  isSelected,
  onClick,
  ariaLabel,
  label,
  width = CHORD_CARD_WIDTH,
  height = CHORD_CARD_HEIGHT,
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    drawChordCard(svgRef.current, { variation, isSelected }, { width, height });
  }, [variation, isSelected, width, height]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      style={{ touchAction: "manipulation" }}
      className={cn(
        "flex shrink-0 flex-col items-center rounded-md p-1.5 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50",
        isSelected ? "bg-amber-500/5" : "hover:bg-zinc-700/30"
      )}
    >
      <div ref={svgRef} aria-hidden="true" />
      <div
        className={cn(
          "mt-1 text-[10px] leading-tight",
          isSelected ? "text-amber-400" : "text-zinc-400"
        )}
      >
        {label}
      </div>
    </button>
  );
}
