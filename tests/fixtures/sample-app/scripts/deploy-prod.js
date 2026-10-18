// Simula um deploy de produção: deixa uma marca para o teste detectar se rodou.
import { writeFileSync } from 'node:fs';
writeFileSync(new URL('../.deployed', import.meta.url), new Date().toISOString());
console.log('deploy de produção executado');
