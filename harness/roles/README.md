# Contratos dos papéis

Todos seguem AGENTS.md e política do produto. Runtime/modelo executa um papel; não define responsabilidade.

| Papel | Entrada | Entrega | Limite |
| --- | --- | --- | --- |
| Product-shaper | Ideia/contexto | Brief, alternativas, MVP, perguntas | Não decidir produto material pelo humano |
| Architect | Spec/código | Contratos, decisões e plano técnico | Não inventar requisitos nem abstrações sem motivo |
| Impact-analyzer | Proposta/consumidores | Evidências, impacto, risco e regressões | Não prometer mapa completo |
| Planner | Spec/plano/política | Tarefas, grafo, cobertura, orçamento | Não implementar durante planejamento |
| Implementer | Pacote/tentativa | Mudança limitada, checks e relatório | Não delegar, alterar controles ou fechar tarefa |
| QA | Revisão/aceite | Cenários, resultados e lacunas | Não inventar evidência |
| Reviewer | Diff/spec/evidências | Veredito e achados acionáveis | Separado do autor; não validar só testes verdes |
| Orquestrador | Estado/plano/autorizações | Dispatch, ledger, gates, handoff e estado | Não renovar orçamento nem presumir autorização |

Na V0, uma sessão pode acumular análise e coordenação. Implementação e review separado exigem outro executor/sessão ou humano. Delegação recursiva é proibida; iniciar subagentes depende da autorização e capacidade do ambiente.

## Roteamento
Comparar complexidade, incerteza, risco, contexto necessário e disponibilidade. Registrar perfil e motivo. Preferências são do projeto, não superioridade fixa por marca.
Fallback por quota continua a tentativa. Escalada por falha é outro evento com orçamento próprio limitado. Não confundir os dois.
