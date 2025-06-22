let produtos = [];

module.exports = {
  adicionar(produto) {
    produtos.push(produto);
  },
  listar() {
    return produtos;
  },
  buscarPorNome(nome) {
    return produtos.find(p => p.nome === nome);
  }
};
