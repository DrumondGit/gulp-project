const Produto = require('../src/models/Produto');

test('cria um produto com nome e preço', () => {
  const produto = new Produto('Leite', 4.5);
  expect(produto.nome).toBe('Leite');
  expect(produto.preco).toBe(4.5);
});