import { useTranslation } from "react-i18next";
import { SCALE_DEFINITIONS } from "../../domain/scales";
import { cn } from "../../utils/cn";

function toggleButtonClassName(isActive) {
  return cn(
    "rounded px-3 py-1.5 text-sm transition-colors",
    isActive
      ? "bg-amber-500/20 text-amber-300"
      : "text-zinc-400 hover:text-zinc-200"
  );
}

export function ScaleControls({
  selectedScale,
  onScaleChange,
  notationMode,
  onNotationModeChange,
  viewMode,
  onViewModeChange,
  showViewToggle,
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-end gap-4">
      <label className="flex w-full min-w-0 flex-col gap-1.5 sm:min-w-64">
        <span className="text-xs font-medium text-zinc-400">
          {t("scales.table.scaleType")}
        </span>
        <select
          value={selectedScale}
          onChange={(event) => onScaleChange(event.target.value)}
          className="select-text rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          {SCALE_DEFINITIONS.map((definition) => (
            <option key={definition.id} value={definition.id}>
              {t(`scales.scaleLabels.${definition.id}`, {
                defaultValue: definition.id,
              })}
            </option>
          ))}
        </select>
      </label>

      <div className="rounded-md border border-zinc-600 bg-zinc-900 p-1">
        <button
          type="button"
          onClick={() => onNotationModeChange("auto")}
          className={toggleButtonClassName(notationMode === "auto")}
        >
          {t("scales.table.auto", { defaultValue: "Auto" })}
        </button>
        <button
          type="button"
          onClick={() => onNotationModeChange("sharps")}
          className={toggleButtonClassName(notationMode === "sharps")}
        >
          {t("scales.table.sharps")}
        </button>
        <button
          type="button"
          onClick={() => onNotationModeChange("flats")}
          className={toggleButtonClassName(notationMode === "flats")}
        >
          {t("scales.table.flats")}
        </button>
      </div>

      {showViewToggle ? (
        <div
          role="group"
          aria-label={t("scales.table.viewLabel")}
          className="rounded-md border border-zinc-600 bg-zinc-900 p-1"
        >
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={toggleButtonClassName(viewMode === "table")}
          >
            {t("scales.table.viewTable")}
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("cards")}
            className={toggleButtonClassName(viewMode === "cards")}
          >
            {t("scales.table.viewCards")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
