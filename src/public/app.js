async function cadastrarProduto() {
  const nome = document.getElementById('produto-nome').value;
  const preco = parseFloat(document.getElementById('produto-preco').value);
  if (!nome || isNaN(preco)) return alert('Preencha corretamente');

  // Simula chamada ao backend (usando localStorage)
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.push({ nome, preco });
  localStorage.setItem('produtos', JSON.stringify(produtos));
  atualizarLista();
}

function atualizarLista() {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const lista = document.getElementById('lista-produtos');
  lista.innerHTML = '';
  produtos.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nome} - R$ ${p.preco.toFixed(2)}`;
    lista.appendChild(li);
  });
}

atualizarLista();

// Adição ao index.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`\n🌐 Frontend disponível em http://localhost:${PORT}`);
});

