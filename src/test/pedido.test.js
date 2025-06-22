const Produto = require('../models/Produto');
const Pedido = require('../models/Pedido');
const { expect } = require('chai');

describe('Pedido', function() {
  it('adiciona item ao pedido e calcula total', function() {
    const pedido = new Pedido('Cliente Teste');
    const produto = new Produto('Café', 5);
    pedido.adicionarItem(produto, 2);
    expect(pedido.itens.length).to.equal(1);
    expect(pedido.calcularTotal()).to.equal(10);
  });
});
