import { cn } from "../../utils/cn";

const SIZE_CLASS = {
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

export function ChoiceChip({
  selected,
  onClick,
  children,
  title,
  size = "md",
  mutedWhenUnselected = false,
}) {
  const unselectedText = mutedWhenUnselected
    ? "text-zinc-400"
    : "text-zinc-300";

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "rounded font-medium transition-colors",
        SIZE_CLASS[size],
        selected
          ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50"
          : ["bg-zinc-700/80 hover:bg-zinc-600", unselectedText]
      )}
    >
      {children}
    </button>
  );
}
