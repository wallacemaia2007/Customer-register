import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static REPO_CLIENTES = '_CLIENTES';

  constructor() {}

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nomeBusca: string): Cliente[] {
    const clientes = this.obterStorage();

    if (!nomeBusca) {
      return clientes;
    } else {
      nomeBusca = nomeBusca.toLowerCase();
      return clientes.filter((cliente) => cliente.nome?.toLowerCase().indexOf(nomeBusca) !== -1);
    }
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find((cliente) => cliente.id === id);
  }

  atualizar(cliente: Cliente) {
    const clientes = this.obterStorage();
    clientes.forEach((c) => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    });
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }

  deletar(id: string) {
    const clientes = this.obterStorage();
    const novaLista = clientes.filter((cliente) => cliente.id !== id);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }
}
