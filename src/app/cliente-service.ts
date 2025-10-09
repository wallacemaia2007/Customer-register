import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static REPO_CLIENTES = '_CLIENTES';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  salvar(cliente: Cliente) {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Não executa no servidor
    }
    
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nomeBusca: string): Cliente[] {
    if (!isPlatformBrowser(this.platformId)) {
      return []; // Retorna array vazio no servidor
    }

    const clientes = this.obterStorage();

    if (!nomeBusca) {
      return clientes;
    }

    return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1);
  }

  private obterStorage(): Cliente[] {
    if (!isPlatformBrowser(this.platformId)) {
      return []; // Retorna array vazio no servidor
    }

    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}