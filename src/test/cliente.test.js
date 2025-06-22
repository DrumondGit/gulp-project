const Cliente = require('../models/Cliente');
const { expect } = require('chai');

describe('Cliente', function() {
  it('cria cliente com nome e email', function() {
    const cliente = new Cliente('Ana', 'ana@email.com');
    expect(cliente.nome).to.equal('Ana');
    expect(cliente.email).to.equal('ana@email.com');
  });
});
