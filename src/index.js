const ProdutoController = require('./src/controllers/ProdutoController');
const PedidoController = require('./src/controllers/PedidoController');
const ClienteController = require('./src/controllers/ClienteController');
const RelatorioController = require('./src/controllers/RelatorioController');

console.log("\n📦 Supermercado Simples Iniciado");

ClienteController.criarCliente("João", "joao@email.com");
ClienteController.criarCliente("Maria", "maria@email.com");
ClienteController.listarClientes();

ProdutoController.criarProduto("Arroz", 10.50);
ProdutoController.criarProduto("Feijão", 8.30);
ProdutoController.listarProdutos();

PedidoController.criarPedido("João");
PedidoController.adicionarItem(0, "Arroz", 2);
PedidoController.adicionarItem(0, "Feijão", 1);
PedidoController.finalizarPedido(0);
PedidoController.listarPedidos();

RelatorioController.gerarRelatorioPedidos();
