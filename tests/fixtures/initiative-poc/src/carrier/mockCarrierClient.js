// Cliente simulado da transportadora: devolve status fixos por pedido.
const CANNED = { 'p-1': 'out_for_delivery', 'p-2': 'delivered', 'p-3': 'delayed' };

export const mockCarrierClient = {
  async getStatus(orderId) {
    return CANNED[orderId] ?? 'in_transit';
  },
};
