import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";

export function NotationToggle({ useFlats, onUseFlatsChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-zinc-500">
        {t("chordBuilder.notation")}
      </span>
      <div className="flex rounded-md border border-zinc-600 bg-zinc-800/80 p-0.5">
        <button
          type="button"
          onClick={() => onUseFlatsChange?.(false)}
          className={cn(
            "rounded px-2 py-1 text-xs font-medium transition-colors",
            !useFlats
              ? "bg-amber-500/20 text-amber-400"
              : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          {t("chordBuilder.sharps")}
        </button>
        <button
          type="button"
          onClick={() => onUseFlatsChange?.(true)}
          className={cn(
            "rounded px-2 py-1 text-xs font-medium transition-colors",
            useFlats
              ? "bg-amber-500/20 text-amber-400"
              : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          {t("chordBuilder.flats")}
        </button>
      </div>
    </div>
  );
}
