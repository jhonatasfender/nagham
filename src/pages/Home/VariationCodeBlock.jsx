import { useTranslation } from "react-i18next";

export function VariationCodeBlock({ code }) {
  const { t } = useTranslation();
  if (!code) return null;

  return (
    <div className="rounded border border-zinc-700 bg-zinc-900/50 p-3 font-mono text-xs text-zinc-300 relative">
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 rounded px-2 py-1 text-xs font-medium text-amber-400 bg-amber-500/20 hover:bg-amber-500/30 transition-colors"
      >
        {t("home.code.copy", { defaultValue: "Copiar" })}
      </button>
      <div className="text-[10px] uppercase tracking-wide text-zinc-500 mb-1">
        {t("home.code.title", { defaultValue: "Código da variação" })}
      </div>
      <pre className="select-text whitespace-pre font-mono text-xs text-zinc-300 overflow-x-auto pr-16">
        {code}
      </pre>
    </div>
  );
}
