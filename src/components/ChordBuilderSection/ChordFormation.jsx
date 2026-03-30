import { useTranslation } from "react-i18next";

export function ChordFormation({ chordNotes }) {
  const { t } = useTranslation();
  const notes = chordNotes ?? [];

  return (
    <div className="mt-6 border-t border-zinc-700 pt-4">
      <h3 className="mb-2 text-xs font-medium text-zinc-500">
        {t("chordBuilder.formationTitle")}
      </h3>
      <p className="mb-3 text-xs text-zinc-500">
        {t("chordBuilder.formationDescription")}
      </p>
      <div className="flex flex-wrap gap-2">
        {notes.map(({ name, octave }, i) => (
          <span
            key={`${name}-${octave}-${i}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-zinc-700/80 px-2.5 py-1 font-mono text-sm"
          >
            <span className="text-zinc-200">
              {name}
              {octave}
            </span>
            <span
              className="text-zinc-500 text-xs"
              title={t("chordBuilder.degree")}
            >
              {i + 1}º
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
