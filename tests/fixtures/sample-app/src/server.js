import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { greet } from './greeting.js';
import { ordersByMonth } from './orders.js';

export function handle(request) {
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname === '/') {
    return { status: 200, type: 'text/plain', body: greet('time financeiro') };
  }
  if (url.pathname === '/orders') {
    try {
      const body = JSON.stringify(ordersByMonth(url.searchParams.get('month') ?? ''));
      return { status: 200, type: 'application/json', body };
    } catch (error) {
      return { status: 400, type: 'text/plain', body: error.message };
    }
  }
  return { status: 404, type: 'text/plain', body: 'not found' };
}

const isEntryPoint = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isEntryPoint) {
  createServer((request, response) => {
    const { status, type, body } = handle(request);
    response.writeHead(status, { 'content-type': type });
    response.end(body);
  }).listen(3000);
}
