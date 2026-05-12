# Constituição — Nagham

> Princípios invioláveis. Toda decisão e PR deve respeitá-los; quebrar
> qualquer um exige aprovação explícita do mantenedor e um ADR registrando
> a exceção.

## 1. Público e idioma

- **Público-alvo:** estudantes brasileiros de música (MPB, bossa, jazz, popular).
  Pedagogia em primeiro lugar; jargão acadêmico só quando indispensável.
- **Idioma primário:** Português do Brasil (`pt-BR`). Inglês e Espanhol
  são suportados via i18n com fallback para `pt-BR`.
- Qualquer texto visível ao usuário deve existir nos três `src/i18n/locales/*.json`.

## 2. Convenções musicais

- **Cifra brasileira é o padrão** (Almir Chediak, Ian Guest, Cifra Club).
  Em particular: `dim`/`°` por padrão significa a tétrade (dim7); o
  meio-diminuto é `m7(♭5)` ou `ø`; alterações entram entre parênteses
  (`C7(♭9)`, não `C7-9`).
- **Grafia teórica estrita por padrão** (ver [ADR-0002](adr/0002-grafia-teorica-estrita.md)
  e [`domain/notation-conventions.md`](domain/notation-conventions.md)):
  cada nota de um acorde ocupa uma letra distinta da sequência diatônica;
  doubles-acidentes (`F##`, `B♭♭`, `C♭`) são aceitos quando necessários.
- O toggle `useFlats` só converte sustenidos simples ↔ bemóis simples
  (`C# ↔ D♭`). Hard enharmonics (E#, B#, F##, etc.) **não** são "simplificados"
  para não quebrar a regra de letras distintas.

## 3. Camadas de código

- **`src/domain/`** é a única fonte da verdade musical. JavaScript puro
  (pode importar `@tonaljs/*`). **Não** importa React nem D3.
- **`src/views/`** é só renderização (React + D3 + Verovio). Não duplica
  regras teóricas — consulta `src/domain/`.
- **`src/context/`** mantém estado global mínimo (`selectedNote`).
- **`src/i18n/`** centraliza textos.

## 4. Acessibilidade

- Áreas de toque ≥ 44 × 44 px no mobile (Apple HIG / Material). Quando
  impossível por motivos visuais, expandir o `hit area` SVG sem alterar
  a forma renderizada.
- `touch-action: manipulation` em todo elemento SVG interativo (elimina
  delay de 300 ms iOS e impede double-tap-to-zoom).
- Suporte a navegação por teclado pendente (não bloquear PRs por isso,
  mas registrar em `features/`).

## 5. Dependências

- **Sem libs novas** para coisas que o Web API moderno resolve (áudio:
  Web Audio puro; UI: React 19 nativo).
- Quando uma lib é necessária, prefere-se algo já no projeto (`d3`, `verovio`,
  `@tonaljs/*`) antes de adicionar nova.
- Cada nova dependência exige ADR justificando.

## 6. Validação

Antes de qualquer commit que toque em `src/domain/`:

```bash
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
npm run lint
npm run build
```

Pitch-class audit e theoretical-spelling audit devem terminar em 100 %.

## 7. Atualização de docs

- Toda PR que muda comportamento documentado **atualiza o doc** ou cria um ADR.
- ADRs são imutáveis — em vez de editar, criar novo ADR com `Supersedes:`.
- Glossário cresce orgânico: ao introduzir termo novo, adicionar entrada.
