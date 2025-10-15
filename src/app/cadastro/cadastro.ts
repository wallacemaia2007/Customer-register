import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente-service';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';
import { BrasilapiService } from '../brasilapi-service';
import { Estado, Cidade } from '../brasilapi.models';
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
  @ViewChild('clientesFrm') clientesFrm!: NgForm;
  atualizando: boolean = false;
  cliente: Cliente = Cliente.newCliente();
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  cidades: Cidade[] = [];

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
          if (this.cliente.estado) {
            const event = { value: this.cliente.estado };
            this.carregarMunicipios(event as MatSelectChange);
          }
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
        console.error('Erro ao carregar estados: ' + erro);
        this.mostrarMensagem('Erro ao carregar estados');
      },
    });
  }

  carregarMunicipios(event: MatSelectChange) {
    const uf = event.value;
    this.brasilapiService.listarCidades(uf).subscribe({
      next: (listaCidades) => {
        this.cidades = listaCidades;
      },
      error: (erro) => {
        console.error('Erro ao carregar cidades: ' + erro);
        this.mostrarMensagem('Erro ao carregar cidades');
      },
    });
  }
  consultaCep(cep: string) {
    const cepLimpo = cep?.replace(/\D/g, '');

    if (!cepLimpo || cepLimpo.length !== 8) {
      return;
    }

    this.brasilapiService.informacoesCep(cepLimpo).subscribe({
      next: (infoCep) => {
        this.cliente.estado = infoCep.state;
        this.cliente.bairro = infoCep.neighborhood;
        this.cliente.rua = infoCep.street;

        if (this.cliente.estado) {
          this.brasilapiService.listarCidades(this.cliente.estado).subscribe({
            next: (listaCidades) => {
              this.cidades = listaCidades;
              const cidadeEncontrada = this.cidades.find(
                (c) => c.nome.toLowerCase() === infoCep.city.toLowerCase()
              );

              if (cidadeEncontrada) {
                setTimeout(() => {
                  this.cliente.cidade = cidadeEncontrada.nome;
                });
              }
            },
            error: (erro) => {
              console.error('Erro ao carregar cidades: ' + erro);
              this.mostrarMensagem('Erro ao carregar cidades');
            },
          });
        }
      },
      error: (erro) => {
        console.error('Erro ao consultar CEP: ' + erro);
        this.mostrarMensagem('CEP não encontrado ou inválido');
      },
    });
  }

  salvar() {
    if (this.clientesFrm.invalid) {
      Object.keys(this.clientesFrm.controls).forEach((campo) => {
        const controle = this.clientesFrm.controls[campo];
        controle.markAsTouched();
      });
      this.mostrarMensagem('Por favor, preencha todos os campos obrigatórios!');
      return; 
    }
    const clienteComMesmoEmail = this.clienteService.buscarClientePorEmail(this.cliente.email!);
    if (clienteComMesmoEmail) {
      if (this.atualizando && clienteComMesmoEmail.id === this.cliente.id) {
      } else {
        this.mostrarMensagem('Este email já está cadastrado para outro cliente!');
        return;
      }
    }
    if (!this.atualizando) {
      this.clienteService.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.clientesFrm.resetForm();
      this.cidades = [];
      this.mostrarMensagem('Cliente cadastrado com sucesso!');
      this.router.navigate(['/consulta']);
    } else {
      this.clienteService.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
    }
  }

  voltar() {
    this.router.navigate(['/consulta/']);
  }

  limpar() {
    this.clientesFrm.resetForm();
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK', { duration: 3000 });
  }

  verificaEmailJaCadastrado(email: string): boolean {
    if (this.clienteService.buscarClientePorEmail(email)) return true;
    return false;
  }
}
