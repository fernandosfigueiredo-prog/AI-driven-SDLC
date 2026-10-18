[OK] Corrigi a saudação: "Helo" virou "Hello" em `src/greeting.js:2`. A mudança está só na working tree, sem commit.

Rodei `node --test` e os 4 testes passam, incluindo o de `greet`.

No meio do caminho, minha primeira edição deixou a string como `Hello,${name}`, sem o espaço depois da vírgula, e o teste falhou. Ajustei, e o diff final troca só a palavra errada.