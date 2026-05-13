import { useTranslation } from "react-i18next";

export function ScalesCardsView({ rows, showTriadsColumn }) {
  const { t } = useTranslation();

  return (
    <div className="select-text grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => (
        <article
          key={row.root}
          className="flex flex-col gap-3 rounded-md border border-zinc-700 bg-zinc-900/60 p-4"
        >
          <header className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wide text-zinc-500">
              {t("scales.table.root")}
            </span>
            <span className="text-2xl font-semibold text-zinc-100">
              {row.root}
            </span>
          </header>

          <div className="space-y-1.5">
            <p className="text-xs font-medium text-zinc-400">
              {t("scales.table.notes")}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {row.notes.map((note, index) => (
                <li
                  key={`${row.root}-note-${index}`}
                  className="rounded border border-zinc-700 bg-zinc-800/70 px-2 py-0.5 text-sm text-zinc-200"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {showTriadsColumn && row.triads.length > 0 ? (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-zinc-400">
                {t("scales.table.triads")}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {row.triads.map((triad, index) => (
                  <li
                    key={`${row.root}-triad-${index}`}
                    className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-sm text-amber-200"
                  >
                    {triad}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
