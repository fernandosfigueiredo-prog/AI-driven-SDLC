import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSmsClient } from '../src/sms/smsClient.js';

test('envia para o endpoint configurado', async () => {
  const calls = [];
  const client = createSmsClient({
    baseUrl: 'https://fake.test',
    fetchImpl: async (url, init) => {
      calls.push({ url, body: JSON.parse(init.body) });
      return { ok: true };
    },
  });
  assert.equal(await client.send('+55', 'oi'), true);
  assert.equal(calls[0].url, 'https://fake.test/messages');
});
