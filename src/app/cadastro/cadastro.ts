import { Component, OnInit, Inject, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente-service';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';
import { BrasilapiService } from '../brasilapi-service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.scss'],
})
export class Cadastro implements OnInit {
  atualizando: boolean = false;
  cliente: Cliente = Cliente.newCliente();
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private clienteService: ClienteService,
    private brasilapiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query) => {
      const id = query.get('id');
      if (id) {
        const clienteEncontrado = this.clienteService.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        } else {
          this.cliente = Cliente.newCliente();
        }
      }
    });
    this.carregarEstados();
  }

  carregarEstados() {
    this.brasilapiService.listarEstados().subscribe({
      next: (listaEstados) => {
        this.estados = listaEstados;
      },
      error: (erro) => {
        console.error('Deu erro ' + erro);
      },
    });
  }

  carregarMunicipios(event: MatSelectChange) {
    const uf = event.value;
    this.brasilapiService.listarMunicipios(uf).subscribe({
      next: (listaMunicipíos) => {
        this.municipios = listaMunicipíos;
      },
      error: (erro) => console.error('Deu erro ' + erro),
    });
  }

  salvar() {
    if (!this.atualizando) {
      this.clienteService.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem('Cliente cadastrado com sucesso!');
    } else {
      this.clienteService.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
    }
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK', { duration: 3000 });
  }
}
