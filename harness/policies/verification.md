# Verificação por risco, objetivo e maturidade

Checks obrigatórios no escopo; review independente quando justificado.
L0: prova local. L1: aceite e regressão direta. L2: contratos/consumidores afetados, cenários positivos e negativos relevantes; review quando risco justificar. L3: segurança, impacto, regressão, evidências e review independente.

Revisor recebe spec, diff, objetivo de negócio, maturidade POC/MVP/produção, testes e riscos. Não avaliar POC como sistema de produção por padrão.
Classificar achados BLOQUEANTE, RELEVANTE ou SUGESTÃO, com evidência, consequência e correção mínima. Corrigir trivialidade no mesmo ciclo, sem rodadas administrativas.
Sem execução de check, registrar NÃO EXECUTADO. Nunca ajustar assert, mock ou critério apenas para obter verde.
