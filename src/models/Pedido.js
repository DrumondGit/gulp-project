// src/models/Pedido.js
class Pedido {
  constructor(cliente) {
    this.cliente = cliente;
    this.itens = [];
    this.finalizado = false;
  }

  adicionarItem(produto, quantidade) {
    this.itens.push({ produto, quantidade });
  }

  calcularTotal() {
    return this.itens.reduce((total, item) => {
      return total + item.produto.preco * item.quantidade;
    }, 0);
  }

  finalizarPedido() {
    this.finalizado = true;
  }
}

module.exports = Pedido;
