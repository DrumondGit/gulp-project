const Cliente = require('../src/models/Cliente');

test('cria cliente com nome e email', () => {
  const cliente = new Cliente('Ana', 'ana@email.com');
  expect(cliente.nome).toBe('Ana');
  expect(cliente.email).toBe('ana@email.com');
});
