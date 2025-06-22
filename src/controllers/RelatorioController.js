const PedidoService = require('../services/PedidoService');
const utils = require('../utils/formatador');

class RelatorioController {
  gerarRelatorioPedidos() {
    const pedidos = PedidoService.listarPedidos();
    console.log("\n📊 Relatório de Pedidos:");
    pedidos.forEach(p => {
      console.log(`Cliente: ${p.cliente}\nData: ${utils.formatarData(p.data)}\nTotal: R$ ${p.total.toFixed(2)}\n---`);
    });
  }
}

module.exports = new RelatorioController();
