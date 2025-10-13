import { Component, OnInit, Query, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../cliente-service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {
  nomeBusca: string = '';
  listaCliente: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email','estado', 'municipio', 'acoes'];
  deletando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit() {
    this.listaCliente = this.clienteService.pesquisarClientes('');
  }

  pesquisar() {
    this.listaCliente = this.clienteService.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro/'], { queryParams: { id } });
  }

  preparaDeletar(cliente: Cliente) {
    if (confirm('Tem certeza que deseja deletar o cliente ' + cliente.nome + '?')) {
      this.deletando = true;
      if (cliente.id) {
        this.deletar(cliente.id);
      } else {
        alert('ID do cliente não encontrado.');
        this.deletando = false;
      }
    } else {
      this.deletando = false;
    }
  }

  deletar(id: string) {
    this.clienteService.deletar(id);
    this.listaCliente = this.clienteService.pesquisarClientes('');
    this.deletando = false;
    this.mostrarMensagem('Cliente deletado com sucesso!');
  }
  

    mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK', { duration: 3000 });
}
}
