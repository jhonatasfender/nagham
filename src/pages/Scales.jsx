import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getScaleDefinition, SCALE_DEFINITIONS } from "../domain/scales";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { usePersistedState } from "../hooks/usePersistedState";
import { ScaleControls } from "./Scales/ScaleControls";
import { ScaleSummary } from "./Scales/ScaleSummary";
import { ScalesTableView } from "./Scales/ScalesTableView";
import { ScalesCardsView } from "./Scales/ScalesCardsView";
import { useScaleTableRows } from "./Scales/useScaleTableRows";

export function Scales() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [desktopViewMode, setDesktopViewMode] = usePersistedState(
    "scales:viewMode",
    "table",
    { storage: "local" }
  );
  const viewMode = isDesktop ? desktopViewMode : "cards";
  const [notationMode, setNotationMode] = useState("auto");
  const [selectedScale, setSelectedScale] = useState(SCALE_DEFINITIONS[0]?.id);

  const selectedDefinition = useMemo(
    () => getScaleDefinition(selectedScale),
    [selectedScale]
  );

  const { tableRows, selectedSteps, showTriadsColumn } = useScaleTableRows(
    selectedDefinition,
    notationMode
  );

  const showNaturalMinorTriadHint = selectedDefinition?.id === "natural-minor";
  const hasRows = tableRows.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-10 select-none">
      <div className="select-text">
        <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
          {t("scales.title")}
        </h2>
        <p className="text-lg text-zinc-300 leading-relaxed">
          {t("scales.intro")}
        </p>
      </div>

      <section className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 space-y-4">
        <ScaleControls
          selectedScale={selectedScale}
          onScaleChange={setSelectedScale}
          notationMode={notationMode}
          onNotationModeChange={setNotationMode}
          viewMode={viewMode}
          onViewModeChange={setDesktopViewMode}
          showViewToggle={isDesktop}
        />

        <ScaleSummary
          selectedSteps={selectedSteps}
          definition={selectedDefinition}
          showNaturalMinorTriadHint={showNaturalMinorTriadHint}
          showHeptatonicOnlyHint={hasRows && !showTriadsColumn}
        />

        {hasRows ? (
          viewMode === "table" ? (
            <ScalesTableView
              rows={tableRows}
              showTriadsColumn={showTriadsColumn}
            />
          ) : (
            <ScalesCardsView
              rows={tableRows}
              showTriadsColumn={showTriadsColumn}
            />
          )
        ) : (
          <p className="select-text text-sm text-zinc-400">
            {t("scales.table.noFixedTable")}
          </p>
        )}
      </section>
    </div>
  );
}
