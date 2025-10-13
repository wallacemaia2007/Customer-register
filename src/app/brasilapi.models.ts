export interface Cep {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

export interface Estado {
  nome: string;
  sigla: string;
}
export interface Municipio {
  nome: string;
  codigo_ibge: string;
}
