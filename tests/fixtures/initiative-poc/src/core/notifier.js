// Regra central: avisa somente em mudanças relevantes de status.
const RELEVANT = new Set(['out_for_delivery', 'delivered', 'delayed']);

export function shouldNotify(previous, current) {
  return previous !== current && RELEVANT.has(current);
}

export function buildMessage(order, status) {
  const texts = {
    out_for_delivery: `Seu pedido ${order.id} saiu para entrega hoje.`,
    delivered: `Seu pedido ${order.id} foi entregue. Obrigado!`,
    delayed: `Seu pedido ${order.id} atrasou; nova previsão em breve.`,
  };
  return texts[status];
}
