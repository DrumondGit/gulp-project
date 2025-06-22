let pedidos = [];

module.exports = {
  adicionar(pedido) {
    pedidos.push(pedido);
  },
  listar() {
    return pedidos;
  },
  buscarPorId(id) {
    return pedidos[id];
  }
};