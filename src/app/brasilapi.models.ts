export interface Cep {
  cep: string;
  state: string;       
  city: string;         
  neighborhood: string; 
  street: string;      
  service: string;
  location?: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    }
  }
}

export interface Estado {
  nome: string;
  sigla: string;
}

export interface Cidade {
  nome: string;
  codigo_ibge: string;
}