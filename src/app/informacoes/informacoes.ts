import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cadastro/cliente';
import { ClienteService } from '../cliente-service';

@Component({
  selector: 'app-informacoes',
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
  ],
  templateUrl: './informacoes.html',
  styleUrl: './informacoes.scss',
})
export class Informacoes implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  colunasTable: string[] = [
    'nome',
    'cpf',
    'email',
    'cep',
    'estado',
    'cidade',
    'bairro',
    'rua',
    'complemento',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query) => {
      const id = query.get('id');
      if (id) {
        const clienteEncontrado = this.clienteService.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.cliente = clienteEncontrado;
        } else {
          this.voltar();
        }
      }
    });
  }
  voltar() {
    this.router.navigate(['/consulta/']);
  }

  preparaDeletar(cliente: Cliente) {
    if (confirm('Tem certeza que deseja deletar o cliente ' + cliente.nome + '?')) {
      let clienteId = cliente.id;
      this.clienteService.deletar(clienteId!);
      this.voltar();
    }
  }
}
