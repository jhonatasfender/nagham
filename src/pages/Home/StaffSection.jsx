import { useTranslation } from "react-i18next";
import { StaffView } from "../../views/Staff/StaffView";

export function StaffSection({ selectedNote, onSelectNote, scoreMatrix }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
      <h3 className="mb-3 text-sm font-medium text-zinc-400">
        {t("app.sections.staff")}
      </h3>
      <StaffView
        selectedNote={selectedNote}
        onSelectNote={onSelectNote}
        scoreMatrix={scoreMatrix}
      />
    </div>
  );
}
