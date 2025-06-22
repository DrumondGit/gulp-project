class Categoria {
  constructor(nome) {
    this.id = Categoria.incrementaId();
    this.nome = nome;
  }

  static incrementaId() {
    if (!this.latestId) this.latestId = 0;
    return this.latestId++;
  }
}

module.exports = Categoria;