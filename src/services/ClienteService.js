const Cliente = require('../models/Cliente');

class ClienteService {
  constructor() {
    this.clientes = [];
  }

  criar(nome, email) {
    const cliente = new Cliente(nome, email);
    this.clientes.push(cliente);
    return cliente;
  }

  listar() {
    return this.clientes;
  }

  buscarPorNome(nome) {
    return this.clientes.find(c => c.nome === nome);
  }
}

module.exports = new ClienteService();