# Bug, refactor e spike

Use o mesmo controle de autorização, tentativas, Issues, checkpoint e verificação.

## Bug
Reproduzir sintoma → registrar baseline → investigar causa → analisar impactos → planejar correção limitada → executar → verificar sintoma original e regressões → review.
Se não reproduz, registre evidências e incerteza; não declare causa comprovada.
Referencie requisito/invariante existente. Correção pequena autorizada não precisa passar por discovery completo.

## Refactor
Definir invariantes e comportamento preservado → mapear consumidores/contratos → planejar mudanças → executar → verificar equivalência/regressões → review.
Não adicionar funcionalidade nem mudar contrato silenciosamente.

## Spike
Pergunta, escopo, tempo/orçamento e evidência esperada → investigação → resposta fundamentada ou inconclusiva → recomendação.
Não transformar código experimental em produto sem novo escopo aprovado.

Use [planning](planning.md) para o recorte e [execution](execution.md) para implementar. Checklist e critérios devem ser proporcionais ao risco, sem dispensar gates obrigatórios.
