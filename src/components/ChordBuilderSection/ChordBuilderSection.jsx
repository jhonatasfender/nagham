import { useTranslation } from "react-i18next";
import { getNoteForDisplay } from "../../domain/chord";
import { NOTE_NAMES, NOTE_NAMES_FLATS } from "../../domain/notes";
import { ChordFormation } from "./ChordFormation.jsx";
import { ChordLabelBar } from "./ChordLabelBar.jsx";
import { NotationToggle } from "./NotationToggle.jsx";
import { NotePicker } from "./NotePicker.jsx";
import { QualityField } from "./QualityField.jsx";

export function ChordBuilderSection({
  root,
  triad,
  extension,
  bass,
  useFlats,
  chordLabel,
  chordNotes,
  onRootChange,
  onTriadChange,
  onExtensionChange,
  onBassChange,
  onUseFlatsChange,
}) {
  const { t } = useTranslation();
  const noteNames = useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES;
  const rootDisplay = getNoteForDisplay(root ?? "C", useFlats);
  const bassDisplay = bass != null ? getNoteForDisplay(bass, useFlats) : null;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
      <h2 className="mb-3 text-sm font-medium text-zinc-400">
        {t("chordBuilder.title")}
      </h2>

      <div className="space-y-4">
        <NotationToggle
          useFlats={useFlats}
          onUseFlatsChange={onUseFlatsChange}
        />

        <NotePicker
          labelKey="chordBuilder.root"
          noteNames={noteNames}
          selectedDisplay={rootDisplay}
          onSelect={onRootChange}
        />

        <QualityField
          triad={triad}
          extension={extension}
          onTriadChange={onTriadChange}
          onExtensionChange={onExtensionChange}
        />

        <NotePicker
          labelKey="chordBuilder.bassOptional"
          noteNames={noteNames}
          selectedDisplay={bassDisplay}
          onSelect={onBassChange}
          allowEmpty
        />

        <ChordLabelBar chordLabel={chordLabel} />
      </div>

      <ChordFormation chordNotes={chordNotes} />
    </div>
  );
}
