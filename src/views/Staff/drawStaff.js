import createVerovioModule from "verovio/wasm";
import { VerovioToolkit } from "verovio/esm";
import { noteToMidi, midiToNote } from "../../domain/notes";
import { createSampleMatrix } from "../../domain/notationMatrix";

let toolkitPromise;

function getToolkit() {
  if (!toolkitPromise) {
    toolkitPromise = createVerovioModule().then(
      (verovioModule) => new VerovioToolkit(verovioModule)
    );
  }
  return toolkitPromise;
}

function durationToMeiDur(duration, fallbackUnit = 4) {
  if (duration === "whole") return "1";
  if (duration === "half") return "2";
  if (duration === "quarter") return "4";
  if (duration === "eighth") return "8";
  if (duration === "sixteenth") return "16";
  return String(fallbackUnit);
}

function accidToMei(accidental) {
  if (!accidental) return null;
  if (accidental === "#" || accidental === "sharp") return "s";
  if (
    accidental === "##" ||
    accidental === "x" ||
    accidental === "double-sharp"
  )
    return "ss";
  if (accidental === "b" || accidental === "flat") return "f";
  if (accidental === "bb" || accidental === "double-flat") return "ff";
  if (accidental === "n" || accidental === "natural" || accidental === "♮")
    return "n";
  return null;
}

function midiToMeiPitch(midi, explicitAccidental) {
  const note = midiToNote(midi);
  const pname = note.name[0].toLowerCase();
  const accidentalFromName = note.name.includes("#")
    ? "s"
    : note.name.includes("b")
      ? "f"
      : null;
  const accid = accidToMei(explicitAccidental) ?? accidentalFromName;
  return { pname, oct: String(note.octave), accid };
}

function buildMeiFromScore(score) {
  const meterCount = score?.timeSignature?.count ?? 4;
  const meterUnit = score?.timeSignature?.unit ?? 4;
  const idToNote = new Map();
  const measureXml = [];

  for (
    let measureIndex = 0;
    measureIndex < score.measures.length;
    measureIndex++
  ) {
    const events = score.measures[measureIndex]?.staves?.[0] ?? [];
    const layerParts = [];

    for (let beatIndex = 0; beatIndex < meterCount; beatIndex++) {
      const ev = events[beatIndex];
      if (!ev || !ev.notes?.length) {
        layerParts.push(`<rest dur="${meterUnit}"/>`);
        continue;
      }

      const dur = durationToMeiDur(ev.notes[0]?.duration, meterUnit);
      if (ev.notes.length === 1) {
        const n = ev.notes[0];
        const id = `n-${measureIndex}-${beatIndex}-0`;
        const { pname, oct, accid } = midiToMeiPitch(n.midi, n.accidental);
        const accidAttr = accid ? ` accid="${accid}"` : "";
        layerParts.push(
          `<note xml:id="${id}" pname="${pname}" oct="${oct}" dur="${dur}"${accidAttr}/>`
        );
        idToNote.set(id, midiToNote(n.midi));
      } else {
        const notesXml = ev.notes
          .map((n, noteIndex) => {
            const id = `n-${measureIndex}-${beatIndex}-${noteIndex}`;
            const { pname, oct, accid } = midiToMeiPitch(n.midi, n.accidental);
            const accidAttr = accid ? ` accid="${accid}"` : "";
            idToNote.set(id, midiToNote(n.midi));
            return `<note xml:id="${id}" pname="${pname}" oct="${oct}"${accidAttr}/>`;
          })
          .join("");
        layerParts.push(`<chord dur="${dur}">${notesXml}</chord>`);
      }
    }

    measureXml.push(
      `<measure n="${measureIndex + 1}"><staff n="1"><layer n="1">${layerParts.join("")}</layer></staff></measure>`
    );
  }

  const mei = `<?xml version="1.0" encoding="UTF-8"?>
<mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="4.0.1">
  <music>
    <body>
      <mdiv>
        <score>
          <scoreDef meter.count="${meterCount}" meter.unit="${meterUnit}">
            <staffGrp>
              <staffDef n="1" lines="5" clef.shape="G" clef.line="2"/>
            </staffGrp>
          </scoreDef>
          <section>
            ${measureXml.join("")}
          </section>
        </score>
      </mdiv>
    </body>
  </music>
</mei>`;

  return { mei, idToNote };
}

export function applyStaffNoteSelection(container, idToNote, selectedNote) {
  if (!container || !idToNote?.size) return;

  const selectedMidi =
    selectedNote && selectedNote.octave != null
      ? noteToMidi(selectedNote.name, selectedNote.octave)
      : null;

  idToNote.forEach((noteData, id) => {
    const el = container.querySelector(`#${CSS.escape(id)}`);
    if (!el) return;
    el.classList.remove("staff-note--selected");
    if (selectedMidi !== null) {
      const midi = noteToMidi(noteData.name, noteData.octave);
      if (midi === selectedMidi) {
        el.classList.add("staff-note--selected");
      }
    }
  });
}

const VEROVIO_SVG_CSS = `
svg.definition-scale {
  color: inherit !important;
}
defs path {
  fill: currentColor !important;
  stroke: currentColor !important;
}
.notehead, .notehead *, .stem, .stem *, .ledgerLines, .ledgerLines *,
.rest, .rest *, .clef, .clef *, .barLine, .barLine *, .meterSig, .meterSig * {
  fill: currentColor !important;
  stroke: currentColor !important;
}
.rest, .rest * {
  display: none !important;
}
.pgHead.autogenerated {
  display: none !important;
}
`;

export async function drawStaff(container, data, options = {}) {
  if (!container) return undefined;

  const { selectedNote, scoreMatrix } = data;
  const score = scoreMatrix ?? createSampleMatrix();
  const { onSelectNote, width = 800, scale = 64 } = options;

  const toolkit = await getToolkit();
  const { mei, idToNote } = buildMeiFromScore(score);

  toolkit.setOptions({
    pageWidth: width,
    scale,
    adjustPageHeight: true,
    pageMarginTop: 4,
    pageMarginBottom: 4,
    pageMarginLeft: 6,
    pageMarginRight: 6,
    breaks: "line",
    svgViewBox: true,
    svgCss: VEROVIO_SVG_CSS,
  });
  toolkit.loadData(mei);
  const rawSvg = toolkit.renderToSVG(1, false);
  container.innerHTML = rawSvg;

  const svg = container.querySelector("svg");
  if (!svg) return { idToNote };
  svg.classList.add("notation", "notation--verovio");
  svg.setAttribute("width", "100%");
  svg.removeAttribute("height");
  svg.style.color = "var(--notation-ink)";
  svg.style.background = "var(--notation-paper)";
  svg.style.borderRadius = "0.5rem";

  idToNote.forEach((noteData, id) => {
    const el = container.querySelector(`#${CSS.escape(id)}`);
    if (!el) return;
    el.classList.add("staff-note--interactive");
    if (!onSelectNote) return;
    el.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onSelectNote(noteData);
    });
  });

  applyStaffNoteSelection(container, idToNote, selectedNote);
  return { idToNote };
}
