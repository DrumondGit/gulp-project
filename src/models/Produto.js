class Produto {
  constructor(nome, preco) {
    this.id = Produto.incrementaId();
    this.nome = nome;
    this.preco = preco;
  }

  static incrementaId() {
    if (!this.latestId) this.latestId = 0;
    return this.latestId++;
  }
}

module.exports = Produto;