const PedidoController = require('../controllers/PedidoController');
const { expect } = require('chai');

describe('teste de aceitação', function() {
  it('pedido completo', function() {
    PedidoController.criarPedido('Maria');
    PedidoController.adicionarItem(2, 'Arroz', 1);
    PedidoController.adicionarItem(2, 'Feijão', 1);
    PedidoController.finalizarPedido(2);
    const pedidos = require('../repositories/PedidoRepositorie').listar();
    expect(pedidos[2].finalizado).to.be.true;
  });
});
