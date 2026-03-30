import { useTranslation } from "react-i18next";
import {
  CHORD_QUALITIES_REST,
  CHORD_QUALITY_TRIAD,
  extensionChipLabel,
  TRIAD_I18N_KEY,
} from "./constants.js";
import {
  impliedTriadForExtension,
  triadMajSelected,
  triadMinorSelected,
} from "../../domain/chordBuilderExtensions.js";
import { ChoiceChip } from "./ChoiceChip.jsx";

function extensionQualityTooltip(q, t) {
  if (q === "5") {
    return t("chordBuilder.qualityHintFive");
  }
  if (q === "6" || q === "7" || q === "9") {
    return t("chordBuilder.qualityHint679");
  }
  if (q === "maj9") {
    return t("chordBuilder.qualityHintM9");
  }
  if (q === "9+") {
    return t("chordBuilder.qualityHint9Plus");
  }
  return undefined;
}

export function QualityField({
  triad,
  extension,
  onTriadChange,
  onExtensionChange,
}) {
  const { t } = useTranslation();

  const handleExtensionChipClick = (quality) => {
    if (extension === quality) {
      onExtensionChange?.({ ext: null });
      return;
    }
    const implied = impliedTriadForExtension(quality);
    onExtensionChange?.({
      ext: quality,
      ...(implied != null ? { impliedTriad: implied } : {}),
    });
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-500">
        {t("chordBuilder.quality")}
      </label>
      <div className="mb-3 rounded-md border border-zinc-600 bg-zinc-800/80 p-2.5">
        <span className="mb-2 block text-xs text-zinc-500">
          {t("chordBuilder.qualityMajorMinor")}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {CHORD_QUALITY_TRIAD.map((q) => (
            <ChoiceChip
              key={q}
              title={q}
              size="lg"
              selected={
                q === "Maj"
                  ? triadMajSelected(triad, extension)
                  : triadMinorSelected(triad, extension)
              }
              onClick={() => onTriadChange?.(q)}
            >
              {t(TRIAD_I18N_KEY[q])}
            </ChoiceChip>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {CHORD_QUALITIES_REST.map((q) => (
          <ChoiceChip
            key={q}
            title={extensionQualityTooltip(q, t)}
            selected={q === extension}
            onClick={() => handleExtensionChipClick(q)}
          >
            {extensionChipLabel(q)}
          </ChoiceChip>
        ))}
      </div>
    </div>
  );
}
