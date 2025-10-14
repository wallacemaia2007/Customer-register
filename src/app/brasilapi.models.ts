export interface Cep {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  complemento: string;
}

export interface Estado {
  nome: string;
  sigla: string;
}
export interface Cidade {
  nome: string;
  codigo_ibge: string;
}
