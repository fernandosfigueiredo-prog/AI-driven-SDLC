# Composição de métodos

## Fonte comum
AGENTS.md e harness/policies/ definem nossos controles; specs e decisões do produto permanecem canônicas. Instruções de runtime apenas adaptam o uso. A constituição do Spec Kit, quando adotada, deve refletir esses controles, sem manter política contraditória.

| Origem | Reaproveitamos | Adaptação |
| --- | --- | --- |
| Spec Kit | Spec → plano → tarefas → implementação → verificação/convergência; princípios do projeto | RF/RNF, impacto e cobertura explícitos; loops limitados pelo orçamento |
| TaskForge | Inspeção prévia, workers limitados, escopo/aceite, verificação externa, uma escalada, parada humana | Independência de runtime; estado Git/Issues; limite observado/configurado pelo projeto |
| Nosso workflow | Perguntas validadas, rastreabilidade, handoff e papéis | Estado persistido e orçamento compartilhado entre Claude e Codex |

## Spec Kit instalado
1. Inspecionar versão, integrações e caminhos reais. Registrar no artifact-map.
2. Usar seus comandos/skills efetivamente disponíveis, sem supor sintaxe ou instalação.
3. Manter uma spec/plano/tasks canônicos; complementar campos faltantes, não duplicar documentos.
4. Levar ambiguidades materiais ao humano. “Implement/converge” não autoriza retries ilimitados ou bypass de gates.
5. A extensão de assessment é opcional; discovery manual também atende ao contrato.

## Spec Kit ausente
Usar templates deste repo para operação manual baseada em especificação. Não afirmar integração nativa. Instalação posterior deve fixar versão e preservar configs.

## TaskForge
Adaptamos conceitos, não copiamos código/configuração. Não copiar CLAUDE.md/.claude/ por cima de instruções existentes. Hooks e perfis nativos dependem de implementação e validação por runtime.

Fontes consultadas em 05/10/2026:
- https://github.com/github/spec-kit
- https://github.com/soeirosantos/taskforge
- https://github.com/soeirosantos/taskforge/blob/main/CLAUDE.md
