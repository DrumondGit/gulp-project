const ProdutoController = require('../controllers/ProdutoController');
const PedidoController = require('../controllers/PedidoController');
const { expect } = require('chai');

describe('Integração Produto e Pedido', function() {
  it('integra criação de produto e pedido', function() {
    ProdutoController.criarProduto('Macarrão', 7.5);
    PedidoController.criarPedido('João');
    PedidoController.adicionarItem(1, 'Macarrão', 3);
    const pedidos = require('../src/repositories/PedidoRepository').listar();
    expect(pedidos[1].itens[0].produto.nome).to.equal('Macarrão');
  });
});
