let clientes = [];

module.exports = {
  adicionar(cliente) {
    clientes.push(cliente);
  },
  listar() {
    return clientes;
  },
  buscarPorNome(nome) {
    return clientes.find(c => c.nome === nome);
  }
};
