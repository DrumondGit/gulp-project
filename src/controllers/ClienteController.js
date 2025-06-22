const ClienteService = require('../services/ClienteService');

class ClienteController {
  criarCliente(nome, email) {
    const cliente = ClienteService.criar(nome, email);
    console.log(`👤 Cliente cadastrado: ${cliente.nome} (${cliente.email})`);
  }

  listarClientes() {
    const clientes = ClienteService.listar();
    console.log("\n👥 Lista de Clientes:");
    clientes.forEach(c => {
      console.log(`- ${c.nome} (${c.email})`);
    });
  }
}

module.exports = new ClienteController();
