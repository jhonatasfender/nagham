import { useTranslation } from "react-i18next";
import { ChordCard } from "./ChordCard.jsx";
import { getVariationRegionLabelKey } from "../../domain/voicings";

function regionLabel(region, t) {
  const { key, params } = getVariationRegionLabelKey(region);
  return t(key, params);
}

export function ChordVariationStrip({ variations, selectedIndex, onSelect }) {
  const { t } = useTranslation();
  if (!variations || variations.length < 2) return null;

  return (
    <div className="space-y-2 select-none">
      <div className="text-xs font-medium text-zinc-400">
        {t("voicings.variations_strip_title")}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
        {variations.map((v, idx) => {
          const label = regionLabel(v.region, t);
          const ariaLabel =
            t("voicings.variation_label", {
              n: idx + 1,
              total: variations.length,
            }) +
            " — " +
            label;
          return (
            <ChordCard
              key={idx}
              variation={v}
              isSelected={idx === selectedIndex}
              onClick={() => onSelect(idx)}
              label={label}
              ariaLabel={ariaLabel}
            />
          );
        })}
      </div>
    </div>
  );
}
