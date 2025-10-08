import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor(){

  }

  salvar(cliente:Cliente){
    const strorage = this.obterStorage();
    strorage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(Storage));

  }

  obterStorage() : Cliente[] {
    const Ropositoryclientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(Ropositoryclientes){
      const clientes: Cliente[] = JSON.parse(Ropositoryclientes);
      return clientes;

    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
    }
    }