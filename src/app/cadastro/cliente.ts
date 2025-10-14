import { v4 as uuid } from 'uuid';

export class Cliente {
  id?: string;
  nome?: string;
  cpf?: string;
  dataNascimento?: string;
  email?: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  complemento?: string;

  static newCliente() {
    const cliente = new Cliente();
    cliente.id = uuid();
    return cliente;
  }
}
