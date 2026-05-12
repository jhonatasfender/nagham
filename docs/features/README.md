# Specs de features

> Cada feature média ou grande ganha uma pasta aqui com três arquivos:
> `spec.md` (o **quê** + **por quê**), `plan.md` (o **como**) e
> `tasks.md` (o passo-a-passo).
>
> Features triviais (uma linha de CSS, ajuste de copy, fix óbvio) não
> precisam de spec.

## Quando criar uma pasta

✅ Cria spec se:

- A feature mexe em mais de 3 arquivos.
- Há uma decisão de design não-óbvia (ADR provável).
- A feature exige mudança no domínio musical (ver `domain/`).
- A feature será desenvolvida ao longo de mais de uma sessão.

❌ Pula spec se:

- Mudança puramente cosmética.
- Correção de bug isolada, sem mudança de comportamento documentado.
- Refactor sem impacto externo.

## Template

Crie uma pasta `features/<nome-kebab>/` e copie os três arquivos abaixo.

### `spec.md` — o quê + por quê

```markdown
# Feature: <título>

- **Status:** draft | in-progress | shipped | archived
- **Owner:** <nome>
- **Atualizado:** YYYY-MM-DD

## Por quê

Problema/oportunidade. Quem ganha o quê.

## User story

Como <persona>, quero <ação>, para <benefício>.

## Critérios de aceite

- [ ] Critério 1 (observável, testável)
- [ ] Critério 2
- [ ] ...

## Fora do escopo

Coisas que parecem relacionadas mas não vão ser feitas agora.

## Decisões pendentes

Lista de coisas a esclarecer antes de implementar. Cada item resolvido
vira ADR (se for arquitetural) ou nota inline (se for tática).

## Termos

Lista termos novos para adicionar ao `domain/glossary.md` quando o
trabalho começar.
```

### `plan.md` — como

```markdown
# Plano de implementação: <título>

## Arquivos que vão mudar

- `src/...` — descrição da mudança.
- ...

## Riscos

- O que pode quebrar.
- Como mitigamos.

## Validação

Comandos a rodar antes de considerar pronto.
```

### `tasks.md` — passo-a-passo

```markdown
# Tarefas: <título>

1. [ ] Tarefa 1
2. [ ] Tarefa 2
3. [ ] Tarefa 3
```

## Convenção de arquivamento

Quando a feature for shipped:

1. Atualize `spec.md` Status para `shipped` e adicione `Shipped:` com a data.
2. Se virou ADR, adicione `## ADRs gerados` apontando para o arquivo em `../adr/`.
3. Mantenha a pasta no repo (não delete) — vira histórico consultável.
