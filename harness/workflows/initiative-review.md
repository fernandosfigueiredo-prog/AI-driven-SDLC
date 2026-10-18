# Initiative Review

Avaliação estratégica de uma iniciativa existente em modo **somente leitura**. Nenhuma alteração de código ou documento acontece sem autorização posterior do humano.

## 0. Guarda de não alteração

No início, registre `git status --porcelain` e `git rev-parse HEAD`. No fim, repita e declare "sem alterações" ou a divergência encontrada.

## 1. Reconstruir o propósito

- Fontes: README, documentos, specs, Issues e PRs, histórico de commits (primeiras e últimas mensagens), testes.
- Escreva o propósito em 2-3 linhas, com o grau de confiança: explícito no repositório ou inferido.

## 2. Hipóteses

- **Negócio:** o que precisa ser verdade para valer a pena (usuário, problema, valor).
- **Técnicas:** o que a solução assume (integração viável, desempenho, custo).
- Status de cada uma: validada (com evidência), em teste, não testada ou contradita.

## 3. O que existe e é demonstrável

- Por capability: implementada? testada (o teste existe e roda)? demonstrável (há um caminho para ver funcionando: comando, rota, tela)?
- Rode build e testes locais quando forem seguros; registre comando e resultado. Não instale dependências, não use rede nem credenciais.

## 4. Mock, sandbox ou integração real

Para cada integração externa, classifique: **mock** (simulada no código), **sandbox** (serviço real em ambiente de teste) ou **real** (produção), com o arquivo ou a configuração como evidência. Destaque quando a documentação sugere "real" e o código é mock.

## 5. Arquitetura frente ao objetivo

- A arquitetura serve à maturidade e ao objetivo atuais? Procure sinais de overengineering (camadas, abstrações e infraestrutura sem uso) e de subdimensionamento (risco sem controle).
- Inclua diagrama quando ajudar a decidir: C4 de contexto/contêiner ou sequência do fluxo principal, em Mermaid.

## 6. Desperdícios, lacunas e riscos

- **Desperdício:** esforço que não move a hipótese (processo, código morto, infraestrutura prematura).
- **Lacuna:** o que falta para provar a hipótese principal.
- **Risco:** segurança, dados, custo, dependências, continuidade.

## 7. Recomendações

Para cada abordagem relevante: **manter**, **corrigir**, **simplificar**, **adiar** ou **abandonar**, com justificativa e evidência.

## 8. Próximos slices

Fatias verticais priorizadas por valor, risco e esforço (S/M/L), cada uma com objetivo, hipótese que valida e critério de pronto. Indique a primeira recomendada.

## Saída

Relatório em [templates/initiative-review.md](../../templates/initiative-review.md), abrindo com a tag e o TL;DR. Separe fato verificado de inferência. Gravar o relatório em arquivo, abrir Issues ou mudar código são propostas para autorização posterior.
