const Pedido = require('../models/Pedido');
const ProdutoService = require('./ProdutoService');

class PedidoService {
  constructor() {
    this.pedidos = [];
  }

  criar(cliente) {
    const pedido = new Pedido(cliente);
    this.pedidos.push(pedido);
    return pedido;
  }

  adicionarItem(idPedido, nomeProduto, quantidade) {
    const pedido = this.pedidos.find(p => p.id === idPedido);
    const produto = ProdutoService.buscarPorNome(nomeProduto);
    if (pedido && produto) {
      pedido.adicionarItem(produto, quantidade);
    }
  }

  finalizarPedido(idPedido) {
    const pedido = this.pedidos.find(p => p.id === idPedido);
    if (pedido) {
      pedido.finalizar();
    }
  }

  listarPedidos() {
    return this.pedidos;
  }
}

module.exports = new PedidoService();