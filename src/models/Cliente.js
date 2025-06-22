class Cliente {
  constructor(nome, email) {
    this.id = Cliente.incrementaId();
    this.nome = nome;
    this.email = email;
  }

  static incrementaId() {
    if (!this.latestId) this.latestId = 0;
    return this.latestId++;
  }
}

module.exports = Cliente;