# 0007 — Unificar piano e staff voicings em uma fonte única

- **Status:** Accepted
- **Data:** 2026-05-12
- **Supersedes:** —

## Contexto

Existiam duas pastas paralelas:

- `src/domain/pianoVoicings/<root>.js` — voicings usadas pelo `PianoView`
  (destaca teclas por MIDI).
- `src/domain/staffVoicings/<root>.js` — voicings usadas pelo `StaffView`
  (renderiza partitura via Verovio).

Inspeção byte-a-byte (`diff -q`) confirmou que os **12 pares de arquivos
eram idênticos**: mesma estrutura, mesmas qualidades, mesmas notas e
oitavas. Os módulos `index.js` exportavam funções com nomes diferentes
(`getPianoChordVoicing` × `getStaffChordVoicing`) mas com implementação
literalmente igual.

Toda PR teórica precisava editar 24 arquivos quando bastaria editar 12.
Pior: cada ronda de correção (grafia teórica, dim7 = tetrade brasileira,
etc.) consumia esforço dobrado e dois pontos para a inconsistência
aparecer.

## Decisão

A pasta `pianoVoicings/` continua sendo a **única fonte** de voicings
para teclado/partitura. O módulo `index.js` re-exporta:

```js
export const getStaffChordVoicing = getPianoChordVoicing;
export const getStaffChordVoicingCount = getPianoChordVoicingCount;
```

Assim os callers (`Home.jsx`, scripts de auditoria) podem migrar
gradualmente para `getPianoChordVoicing` sem quebra imediata.

A pasta `staffVoicings/` foi **removida** do repositório.

## Consequências

- ➕ 12 arquivos a menos para manter; mudança teórica edita um lugar.
- ➕ Impossível ficarem fora de sincronia.
- ➕ `scripts/fix-spelling.mjs` simplifica: itera só sobre `pianoVoicings/`.
- ➖ O nome `pianoVoicings/` ficou semanticamente incompleto (também
  serve à partitura). Renomear para `noteVoicings/` ficou fora do escopo
  desta iteração — pode virar uma ADR futura se a confusão de naming
  causar problema real.
- ➖ Documentação que referenciava `staffVoicings/` precisa ser revisada
  (feito em `docs/domain/chords.md` e `docs/domain/notation-conventions.md`).

## Alternativas consideradas

- **Renomear `pianoVoicings/` → `noteVoicings/`** — mais semântico, mas
  obriga atualizar muitos imports (drawStaff, drawPiano, scripts, etc.).
  Adia para futuro.
- **Manter staffVoicings/ como passagem**: re-exportaria pianoVoicings.
  Adiciona arquivos sem benefício.

## Referências

- `src/domain/pianoVoicings/index.js` (alias `getStaffChordVoicing`).
- `docs/features/consolidate-domain-helpers/spec.md`.
