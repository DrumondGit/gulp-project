class Pedido {
  constructor(cliente) {
    this.id = Pedido.incrementaId();
    this.cliente = cliente;
    this.itens = [];
    this.total = 0;
  }

  adicionarItem(produto, quantidade) {
    this.itens.push({ produto, quantidade });
    this.total += produto.preco * quantidade;
  }

  finalizar() {
    this.data = new Date();
  }

  static incrementaId() {
    if (!this.latestId) this.latestId = 0;
    return this.latestId++;
  }
}

module.exports = Pedido;