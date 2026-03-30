import { useTranslation } from "react-i18next";
import { ChoiceChip } from "./ChoiceChip.jsx";

export function NotePicker({
  labelKey,
  noteNames,
  selectedDisplay,
  onSelect,
  allowEmpty = false,
  emptyLabel = "—",
}) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-500">
        {t(labelKey)}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {allowEmpty && (
          <ChoiceChip
            selected={selectedDisplay == null}
            onClick={() => onSelect?.(null)}
            mutedWhenUnselected
          >
            {emptyLabel}
          </ChoiceChip>
        )}
        {noteNames.map((name) => (
          <ChoiceChip
            key={name}
            selected={name === selectedDisplay}
            onClick={() => onSelect?.(name)}
          >
            {name}
          </ChoiceChip>
        ))}
      </div>
    </div>
  );
}
