const ProdutoService = require('../services/ProdutoService');

class ProdutoController {
  criarProduto(nome, preco) {
    const produto = ProdutoService.criar(nome, preco);
    console.log(`✅ Produto criado: ${produto.nome} - R$ ${produto.preco}`);
  }

  listarProdutos() {
    const produtos = ProdutoService.listar();
    console.log("\n📋 Lista de Produtos:");
    produtos.forEach(p => {
      console.log(`- ${p.nome} (R$ ${p.preco})`);
    });
  }
}

module.exports = new ProdutoController();