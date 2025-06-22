const Produto = require('../models/Produto');

class ProdutoService {
  constructor() {
    this.produtos = [];
  }

  criar(nome, preco) {
    const produto = new Produto(nome, preco);
    this.produtos.push(produto);
    return produto;
  }

  listar() {
    return this.produtos;
  }

  buscarPorNome(nome) {
    return this.produtos.find(p => p.nome === nome);
  }
}

module.exports = new ProdutoService();