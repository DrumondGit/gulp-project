let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let carrinho = [];

function salvarProdutos() {
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Cadastrar produto
async function cadastrarProduto() {
  const nome = document.getElementById('produto-nome').value;
  const preco = parseFloat(document.getElementById('produto-preco').value);
  if (!nome || isNaN(preco)) return alert('Preencha corretamente');

  produtos.push({ id: Date.now(), nome, preco });
  salvarProdutos();
  atualizarLista();
  atualizarDashboard();
  renderProdutosDisponiveis();
}

// Remover produto
function removerProduto(id) {
  produtos = produtos.filter(p => p.id !== id);
  salvarProdutos();
  atualizarLista();
  atualizarDashboard();
  renderProdutosDisponiveis();
}

// Atualizar lista com filtro opcional
function atualizarLista(filtro = '') {
  const lista = document.getElementById('lista-produtos');
  if (!lista) return;
  lista.innerHTML = '';
  produtos
    .filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${p.nome} - R$ ${p.preco.toFixed(2)}</span>
        <button onclick="removerProduto(${p.id})">Remover</button>`;
      li.classList.add('produto-item');
      lista.appendChild(li);
    });
}

// Busca por filtro (input oninput="filtrarProdutos()")
function filtrarProdutos() {
  const termo = document.getElementById('filtro-produto').value || '';
  atualizarLista(termo);
}

// Carrinho de compras
function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  renderCarrinho();
  atualizarDashboard();
}

function renderProdutosDisponiveis() {
  const lista = document.getElementById('produtos-disponiveis');
  if (!lista) return;
  lista.innerHTML = '';
  produtos.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `${p.nome} - R$ ${p.preco.toFixed(2)} 
      <button onclick='adicionarAoCarrinho(${JSON.stringify(p)})'>Comprar</button>`;
    lista.appendChild(li);
  });
}

function renderCarrinho() {
  const lista = document.getElementById('carrinho');
  const totalSpan = document.getElementById('total');
  if (!lista || !totalSpan) return;

  lista.innerHTML = '';
  let total = 0;
  carrinho.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nome} - R$ ${p.preco.toFixed(2)}`;
    lista.appendChild(li);
    total += p.preco;
  });
  totalSpan.textContent = total.toFixed(2);
}

function atualizarGraficoDashboard() {
  const totalProdutos = produtos.length;
  const somaProdutos = produtos.reduce((acc, p) => acc + p.preco, 0);
  const media = somaProdutos / (produtos.length || 1);
  const somaCarrinho = carrinho.reduce((acc, p) => acc + p.preco, 0);

  // Escalas visuais
  const escala = 100 / 20; // máximo: 20 itens/preço → 100px
  const alturaProd = Math.min(100, totalProdutos * escala);
  const alturaMedia = Math.min(100, media * escala);
  const alturaCarrinho = Math.min(100, somaCarrinho * escala);

  document.getElementById("bar-produtos").style.height = `${alturaProd}px`;
  document.getElementById("bar-media").style.height = `${alturaMedia}px`;
  document.getElementById("bar-carrinho").style.height = `${alturaCarrinho}px`;

  document.getElementById("val-produtos").textContent = totalProdutos;
  document.getElementById("val-media").textContent = `R$ ${media.toFixed(2)}`;
  document.getElementById("val-carrinho").textContent = `R$ ${somaCarrinho.toFixed(2)}`;
}

// Dashboard
function atualizarDashboard() {
  const totalProdutos = document.getElementById('total-produtos');
  const precoMedio = document.getElementById('preco-medio');
  const somaCarrinho = document.getElementById('soma-carrinho');

  if (totalProdutos) totalProdutos.textContent = produtos.length;
  if (precoMedio) {
    const media = produtos.reduce((acc, p) => acc + p.preco, 0) / (produtos.length || 1);
    precoMedio.textContent = media.toFixed(2);
  }
  if (somaCarrinho) {
    const total = carrinho.reduce((acc, p) => acc + p.preco, 0);
    somaCarrinho.textContent = total.toFixed(2);
  }
  atualizarGraficoDashboard();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  atualizarLista();
  atualizarDashboard();
  renderProdutosDisponiveis();
});
