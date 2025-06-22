const ProdutoController = require('../src/controllers/ProdutoController');
const PedidoController = require('../src/controllers/PedidoController');

test('integra criação de produto e pedido', () => {
  ProdutoController.criarProduto('Macarrão', 7.5);
  PedidoController.criarPedido('João');
  PedidoController.adicionarItem(1, 'Macarrão', 3);
  const pedidos = require('../src/repositories/PedidoRepository').listar();
  expect(pedidos[1].itens[0].produto.nome).toBe('Macarrão');
});