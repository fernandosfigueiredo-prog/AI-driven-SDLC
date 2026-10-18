**[EM]** Pausei o Discovery. A spec está salva como rascunho, o estado está em `.sdlc/state.md` e nenhum código foi alterado.

## Onde estamos

- **Iniciativa:** conciliação de pedidos do mês com o extrato bancário (L2 · POC).
- **Fase:** Discovery encerrado, aguardando a sua aprovação. A spec está em `docs/specs/conciliacao-bancaria/spec.md`, com `status: draft`.
- **O que já está decidido:** os pontos abaixo vieram das suas respostas e estão registrados na spec.
  - A usuária é a analista do financeiro, uma vez por mês.
  - O extrato é um CSV `data;descricao;valor`, com `;` como separador e vírgula decimal.
  - Um pedido bate com um lançamento quando o valor é igual e as datas diferem em até 2 dias.
  - A saída é `POST /reconciliation?month=AAAA-MM`, com as listas de pedidos sem lançamento e lançamentos sem pedido.
  - É uma POC, sem autenticação e sem guardar o extrato.
- **Código:** nada foi implementado. O `/sdlc:build` foi barrado de propósito, porque a spec não está aprovada. Também não existe plano nem tarefas ainda.
- **Git:** `main` em `4fe350a`. A spec e o `state.md` são arquivos novos, ainda sem commit.

## O que falta decidir (só você)

1. **Aprovar a spec** (AC1–AC7), ajustar ou continuar a entrevista. Sem isso, nada avança. Recomendo aprovar.
2. **Confirmar ou corrigir as cinco hipóteses**, que não bloqueiam a aprovação:
   - datas aceitas em `AAAA-MM-DD` e `DD/MM/AAAA`;
   - só entradas (valores positivos) entram na conciliação;
   - a primeira linha do CSV é o cabeçalho;
   - todas as linhas do CSV enviado entram na conciliação;
   - os valores são comparados em centavos inteiros.
   Se a analista tiver um CSV real, a confirmação mais rápida é olhar o formato da data e se há linhas de saída.
3. **Autorizações do pipeline.** Hoje estão push, PR e Issues como "não", o padrão do projeto. Sem mudança, o resultado fica numa branch local para você revisar.

## Depois que você aprovar

Sigo sozinho: refinamento e tarefas, build com commits por tarefa, review, relatório. Merge na `main` e deploy continuam sendo decisão sua.

Para retomar, diga "aprovo" ou "ajustar: …".