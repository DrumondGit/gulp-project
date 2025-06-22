const Produto = require('../models/Produto');
const { expect } = require('chai');

describe('Produto', function() {
  it('cria um produto com nome e preço', function() {
    const produto = new Produto('Leite', 4.5);
    expect(produto.nome).to.equal('Leite');
    expect(produto.preco).to.equal(4.5);
  });
});
