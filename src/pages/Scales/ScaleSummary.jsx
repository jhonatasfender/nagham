import { useTranslation } from "react-i18next";

export function ScaleSummary({
  selectedSteps,
  definition,
  showNaturalMinorTriadHint,
  showHeptatonicOnlyHint,
}) {
  const { t } = useTranslation();

  return (
    <>
      {selectedSteps.length > 0 ? (
        <div className="select-text space-y-2">
          <p className="text-xs text-zinc-400">
            {t("scales.table.stepPattern")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selectedSteps.map((step, index) => (
              <span
                key={`${step}-${index}`}
                className="rounded-md border border-zinc-600 bg-zinc-900 px-2 py-1 text-xs text-zinc-300"
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {definition?.approximate12Tet ? (
        <p className="select-text rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
          {t("scales.table.approximationWarning")}
        </p>
      ) : null}

      {definition?.conceptualOnly ? (
        <p className="select-text rounded-md border border-zinc-600 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-300">
          {t("scales.table.conceptOnly")}
        </p>
      ) : null}

      {showNaturalMinorTriadHint ? (
        <p className="select-text rounded-md border border-zinc-600 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 leading-relaxed">
          {t("scales.table.triadsNaturalMinorHybridHint")}
        </p>
      ) : null}

      {showHeptatonicOnlyHint ? (
        <p className="select-text rounded-md border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400 leading-relaxed">
          {t("scales.table.triadsHeptatonicOnly")}
        </p>
      ) : null}
    </>
  );
}
