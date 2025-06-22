const PedidoService = require('../services/PedidoService');

class PedidoController {
  criarPedido(cliente) {
    const pedido = PedidoService.criar(cliente);
    console.log(`🧾 Pedido criado para ${cliente} (ID: ${pedido.id})`);
  }

  adicionarItem(idPedido, nomeProduto, quantidade) {
    PedidoService.adicionarItem(idPedido, nomeProduto, quantidade);
    console.log(`+ Item adicionado ao pedido ${idPedido}: ${quantidade}x ${nomeProduto}`);
  }

  finalizarPedido(idPedido) {
    PedidoService.finalizarPedido(idPedido);
    console.log(`📦 Pedido ${idPedido} finalizado.`);
  }

  listarPedidos() {
    const pedidos = PedidoService.listarPedidos();
    console.log("\n🧾 Pedidos Realizados:");
    pedidos.forEach(p => {
      console.log(`Pedido ${p.id} - Cliente: ${p.cliente} - Total: R$ ${p.total.toFixed(2)}`);
    });
  }
}

module.exports = new PedidoController();