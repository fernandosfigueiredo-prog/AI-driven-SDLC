# Bootstrap

Adoção leve e sob demanda: nada é criado no projeto até existir necessidade.

## Instalação

- Claude Code: instale o plugin `sdlc` ([USAGE](../../docs/USAGE.md)). Não é preciso copiar arquivos para o projeto.
- Codex (opcional): ver [adapters/codex](../adapters/codex.md).

## Primeira iniciativa L2+

Quando surgir o primeiro trabalho L2+ (ou o humano pedir), o EM Buddy:

1. lê as instruções existentes (README, CLAUDE.md, AGENTS.md, CONTRIBUTING);
2. identifica stack e comandos de build, teste, lint e typecheck;
3. infere maturidade e modo GitHub (remote configurado, `gh` autenticado);
4. pergunta somente o que não consegue inferir, numa única rodada: maturidade, modo GitHub e autorizações padrão (push, PR, Issues);
5. grava `.sdlc/project.md` ([template](../../templates/project.md)) e segue para o trabalho.

L0/L1 nunca disparam bootstrap.

## Regras

- Preserve convenções e instruções do projeto; o framework não sobrescreve CLAUDE.md, AGENTS.md ou configurações do produto.
- Registre só o que não pode ser inferido de forma confiável.
- Não crie política, mapa de artefatos ou Issues antes do primeiro trabalho que precise deles.
