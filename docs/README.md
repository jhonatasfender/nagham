# Documentação Nagham

A app Nagham é domínio-rico (teoria musical). Estes documentos seguem o
padrão **Spec-Driven Development** descrito no [GitHub Spec Kit][spec-kit]
e nas práticas de [Martin Fowler][fowler-adr] para ADRs.

A regra geral é simples: **a especificação é o artefato primário**. Toda PR
que muda comportamento atualiza o doc relevante ou cria um novo ADR.

## Mapa

```
docs/
├── README.md                    # este arquivo
├── constitution.md              # princípios invioláveis (1 página)
├── frontend-architecture.md     # convenções React + D3 + Verovio
├── braco-do-violao.md           # tabela de referência (cordas × casas)
├── domain/                      # camada de teoria musical
│   ├── glossary.md              # vocabulário ubíquo PT-BR
│   ├── notation-conventions.md  # grafia, cifra BR vs US, useFlats
│   ├── chords.md                # qualidades, voicings, validação
│   └── scales.md                # escalas, graus, tríades nos graus
├── adr/                         # decisões arquiteturais imutáveis (MADR)
│   ├── README.md                # índice + template
│   └── NNNN-titulo.md
└── features/                    # spec.md + plan.md + tasks.md por feature
    └── README.md                # template
```

## Quem usa o quê

| Documento                  | Audiência                              | Mutabilidade                                      |
| -------------------------- | -------------------------------------- | ------------------------------------------------- |
| `constitution.md`          | Humanos + agentes IA                   | Quase nunca muda; lido em todo `AGENTS.md`        |
| `domain/*`                 | Quem mexe em teoria musical            | Atualizado a cada feature que toca em chord/scale |
| `adr/*`                    | Quem quer entender "por quê"           | **Nunca editado** — só superseded por outro ADR   |
| `frontend-architecture.md` | Quem implementa                        | Atualizado quando muda padrão de pasta/D3         |
| `features/*/spec.md`       | Quem está implementando aquela feature | Durante o trabalho; arquivado depois              |

## Workflow para uma nova feature

1. **Brainstorm** — converse, sem código.
2. **Especificar** — escreva `docs/features/<nome>/spec.md` (o quê + porquê + critérios de aceite).
3. **Esclarecer** — leia em voz alta para um agente, identifique buracos.
4. **Decidir** — se houver escolha de design não-óbvia, cria um ADR.
5. **Planejar** — `plan.md` curto (quais arquivos, módulos, riscos).
6. **Implementar** — código alinhado com `constitution.md` + spec.
7. **Sincronizar** — atualize `domain/*` ou crie ADR conforme necessário antes de commitar.

## Auditores automáticos

Dois scripts cuidam para que as especificações não fiquem em conflito com o
código de teoria musical:

- `scripts/audit-spelling.mjs` — valida que cada voicing usa a letra correta
  para cada grau (regra do glossário "letra distinta por grau").
- `scripts/render-notes.mjs --summary` — valida pitch classes em todas as
  voicings (piano + violão).

Rode ambos antes de qualquer PR que toque em `src/domain/`.

[spec-kit]: https://github.com/github/spec-kit
[fowler-adr]: https://martinfowler.com/bliki/ArchitectureDecisionRecord.html
