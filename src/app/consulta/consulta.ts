import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../cliente-service';
import { Cliente } from '../cadastro/cliente';

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
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email'];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.listaCliente = this.clienteService.pesquisarClientes('');
  }

  pesquisar() {
    this.listaCliente = this.clienteService.pesquisarClientes(this.nomeBusca);
  }
}
