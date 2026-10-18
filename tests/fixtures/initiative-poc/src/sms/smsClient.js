// Envio de SMS pelo ambiente de testes do provedor (sandbox): não entrega a celulares reais.
const BASE_URL = process.env.SMS_API_BASE ?? 'https://sandbox.sms-provider.example.test/v1';

export function createSmsClient({ fetchImpl = globalThis.fetch, baseUrl = BASE_URL } = {}) {
  return {
    async send(to, text) {
      const response = await fetchImpl(`${baseUrl}/messages`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ to, text }),
      });
      return response.ok;
    },
  };
}
