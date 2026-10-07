# Bootstrap

Bootstrap deve ser leve.

## Objetivo

Fazer o harness entender o projeto existente sem criar configuração paralela desnecessária.

## Procedimento

1. leia instruções existentes;
2. identifique stack, build, testes, lint e comandos relevantes;
3. identifique restrições, ambientes e ações que exigem autorização;
4. preserve convenções existentes;
5. registre apenas configurações que não possam ser inferidas de forma confiável.

Não é obrigatório criar `project-policy.md` ou `artifact-map.md`. Se o projeto precisar de configuração persistente, use um único `docs/project.md` ou equivalente local.

## Saída

Contexto suficiente para classificar e executar trabalho com segurança, sem implementar produto.
