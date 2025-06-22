const PedidoController = require('../src/controllers/PedidoController');

test('teste de aceitação: pedido completo', () => {
  PedidoController.criarPedido('Maria');
  PedidoController.adicionarItem(2, 'Arroz', 1);
  PedidoController.adicionarItem(2, 'Feijão', 1);
  PedidoController.finalizarPedido(2);
  const pedidos = require('../src/repositories/PedidoRepository').listar();
  expect(pedidos[2].finalizado).toBe(true);
});