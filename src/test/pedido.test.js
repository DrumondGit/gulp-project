const Produto = require('../src/models/Produto');
const Pedido = require('../src/models/Pedido');

test('adiciona item ao pedido e calcula total', () => {
  const pedido = new Pedido('Cliente Teste');
  const produto = new Produto('Café', 5);
  pedido.adicionarItem(produto, 2);
  expect(pedido.itens.length).toBe(1);
  expect(pedido.calcularTotal()).toBe(10);
});