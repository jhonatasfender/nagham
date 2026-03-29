# Arquitetura do frontend

> Estrutura para manter o projeto organizado e escalar com várias implementações D3.js.

**Abordagem:** híbrida — uma pasta por visualização (view) e uma camada compartilhada para código D3 reutilizável.

---

## 1. Estrutura de pastas

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── assets/
├── domain/              # modelo e regras de negócio (notas, violão, etc.)
│   ├── notes.js
│   └── guitar.js
├── context/             # estado global React (ex.: nota selecionada)
│   └── SelectedNoteContext.jsx
├── d3/                  # utilitários D3 reutilizáveis entre views
│   ├── scales.js       # escalas comuns (MIDI→Y, etc.)
│   └── index.js        # re-export ou barrel
├── views/               # uma pasta por visualização D3
│   ├── Staff/
│   │   ├── StaffView.jsx      # componente React (ref + useEffect)
│   │   ├── drawStaff.js       # lógica D3 do desenho (pentagrama, notas)
│   │   └── StaffView.css      # opcional
│   ├── Piano/
│   │   ├── PianoView.jsx
│   │   ├── drawPiano.js
│   │   └── PianoView.css
│   ├── Guitar/
│   │   ├── GuitarView.jsx
│   │   ├── drawGuitar.js
│   │   └── GuitarView.css
│   └── index.js        # re-export das views (opcional)
├── components/          # componentes React sem D3 (lists, UI)
│   └── lists/
└── utils/               # helpers gerais (format, etc.)
```

| Pasta         | Uso                                                                    |
| ------------- | ---------------------------------------------------------------------- |
| `domain/`     | Regras e dados de domínio (notas, MIDI, braço). Sem React nem D3.      |
| `context/`    | Estado global React (ex.: nota selecionada).                           |
| `d3/`         | Apenas código D3 compartilhado (escalas, helpers).                     |
| `views/`      | Uma pasta por visualização: React + D3 daquela view + CSS se precisar. |
| `components/` | Componentes de UI genéricos (sem D3).                                  |
| `utils/`      | Helpers gerais (formatação, etc.).                                     |

---

## 2. Convenções

### Views (visualizações D3)

- **Nome da pasta:** PascalCase, singular (ex.: `Staff`, `Piano`, `Guitar`).
- **Componente React:** `{Nome}View.jsx` — dono do `ref` do container, chama o módulo de desenho em `useEffect`, passa props/callbacks (ex.: `selectedNote`, `onSelectNote`).
- **Lógica D3:** `draw{Nome}.js` (ou pasta `d3/` dentro da view se ficar grande) — função que recebe elemento DOM (ou seleção), dados e opções; desenha/atualiza o SVG. Sem estado React.
- **Estilos:** `{Nome}View.css` na mesma pasta, ou Tailwind nos containers; cores/traços do SVG podem vir de D3 (fill/stroke) ou variáveis CSS.

### Módulos em `d3/`

- Funções puras quando possível (escalas, formatação de eixo).
- Export nomeado (ex.: `createMidiScale`) para tree-shake e uso explícito.
- `d3/index.js` pode re-exportar tudo para `import { x } from '@/d3'`.

### Domain e context

- `domain/` não importa React nem D3.
- `context/` pode importar de `domain/` (ex.: `DEFAULT_NOTE`).
- Views importam de `context` (hooks) e de `domain` (mapeamentos).

---

## 3. Integração com o plano de notas musicais

- Estado único da nota selecionada em `SelectedNoteContext`; as três views leem e atualizam esse estado.
- Modelo de nota e mapeamento violão em `domain/notes.js` e `domain/guitar.js`.
- Partitura, piano e violão ficam em `views/Staff/`, `views/Piano/`, `views/Guitar/` conforme esta estrutura.
- Referência de implementação: `docs/plans/2025-03-16-notas-musicais-implementation.md`.

---

## 4. Adicionando uma nova visualização D3

1. Criar pasta em `views/{Nome}/`.
2. Adicionar `{Nome}View.jsx` (ref, useEffect, props do contexto/domínio).
3. Adicionar `draw{Nome}.js` com a lógica de desenho D3 (recebe container, data, options).
4. Se houver escalas ou helpers reutilizáveis, extrair para `src/d3/` (ex.: `scales.js`).
5. Registrar a view no layout em `App.jsx` (ou rota, se no futuro houver).
6. Opcional: `views/index.js` re-exporta as views para imports centralizados.

---

## 5. Resumo

- **Uma view = uma pasta** em `views/` com React + D3 daquela view.
- **D3 compartilhado** em `src/d3/`.
- **Domínio e estado** em `domain/` e `context/`, sem acoplar à renderização D3.

Isso mantém o código organizado e preparado para várias implementações D3 sem misturar responsabilidades.
