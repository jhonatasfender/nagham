import { useTranslation } from "react-i18next";
import { PianoView } from "../../views/Piano/PianoView";

export function PianoSection({
  selectedNote,
  onSelectNote,
  chordNotes,
  root,
  quality,
}) {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
      <h3 className="mb-3 text-sm font-medium text-zinc-400">
        {t("app.sections.piano")}
      </h3>
      <PianoView
        selectedNote={selectedNote}
        onSelectNote={onSelectNote}
        chordNotes={chordNotes}
        root={root}
        quality={quality}
      />
    </div>
  );
}
