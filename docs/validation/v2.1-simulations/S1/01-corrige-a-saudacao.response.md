[OK] Corrigi a saudação em `src/greeting.js:2`: agora retorna `Hello, ${name}!` em vez de "Helo". Os 4 testes passam com `npm test`, incluindo `greeting.test.js`, que espera `Hello, Ana!`.

Meu primeiro edit tirou sem querer o espaço depois da vírgula (`Hello,Ana!`) e o teste falhou. Corrigi e rodei de novo.

Não fiz commit. Registrei uma linha no handoff em `.sdlc/handoff/2026-10-18-171504-fix-greeting-typo.md`.