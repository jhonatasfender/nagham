import { useTranslation } from "react-i18next";

export function ScalesTableView({ rows, showTriadsColumn }) {
  const { t } = useTranslation();

  return (
    <div className="select-text overflow-x-auto rounded-md border border-zinc-700">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-zinc-900/80 text-zinc-300">
          <tr>
            <th className="border-b border-zinc-700 px-3 py-2 text-left font-medium">
              {t("scales.table.root")}
            </th>
            <th className="border-b border-zinc-700 px-3 py-2 text-left font-medium">
              {t("scales.table.notes")}
            </th>
            {showTriadsColumn ? (
              <th className="border-b border-zinc-700 px-3 py-2 text-left font-medium">
                {t("scales.table.triads")}
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.root} className="odd:bg-zinc-800/20">
              <td className="border-b border-zinc-800 px-3 py-2 font-semibold text-zinc-100">
                {row.root}
              </td>
              <td className="border-b border-zinc-800 px-3 py-2 text-zinc-300">
                {row.notes.join(" - ")}
              </td>
              {showTriadsColumn ? (
                <td className="border-b border-zinc-800 px-3 py-2 text-zinc-300">
                  {row.triads.join(" - ")}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
