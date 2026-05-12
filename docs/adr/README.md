# ADRs (Architecture Decision Records)

> Cada arquivo documenta uma decisão **imutável**. Se mudarmos de ideia,
> criamos um novo ADR com `Supersedes: NNNN` e atualizamos o status do
> anterior para `Superseded by: NNNN`.
>
> Formato: **MADR** (Markdown Architectural Decision Records) — versão
> reduzida. Ver [adr.github.io](https://adr.github.io/adr-templates/) e
> [github.com/adr/madr](https://github.com/adr/madr).

## Índice

| ID | Título | Status | Data |
|---|---|---|---|
| [0001](0001-uso-do-verovio-para-partitura.md) | Uso do Verovio para renderizar partitura | Accepted | 2025-XX |
| [0002](0002-grafia-teorica-estrita.md) | Grafia teórica estrita por padrão | Accepted | 2026-05-12 |
| [0003](0003-dim-significa-dim7-cifra-br.md) | "dim" no UI significa dim7 (cifra brasileira) | Accepted | 2026-05-12 |
| [0004](0004-touch-mobile-pointerdown.md) | Captura de toque mobile via pointerdown + touch-action | Accepted | 2026-05-12 |
| [0005](0005-audio-web-audio-puro.md) | Áudio via Web Audio puro (sem Tone.js) | Accepted | 2026-05-12 |
| [0006](0006-ascii-text-chord-symbol-style.md) | Renderização de cifras em texto ASCII | Accepted | 2026-05-12 |

## Template

Copie para iniciar um novo ADR (`NNNN-titulo-em-kebab.md`):

```markdown
# NNNN — Título curto e descritivo

- **Status:** Proposed | Accepted | Deprecated | Superseded by NNNN
- **Data:** YYYY-MM-DD
- **Supersedes:** —

## Contexto

O problema/escolha que motivou a decisão. Quais forças estão em jogo
(performance, manutenibilidade, UX, restrições externas).

## Decisão

A escolha feita, na voz ativa. "Vamos usar X" — não "consideramos usar X".

## Consequências

- ➕ Benefícios claros (concretos, não genéricos).
- ➖ Custos / tradeoffs aceitos.
- 🔄 O que precisa ser feito por causa desta decisão (migração, doc, etc.).

## Alternativas consideradas

Lista curta com 1-2 linhas cada, explicando por que não foram escolhidas.

## Referências

- Links externos, fontes, conversas, commits.
```
