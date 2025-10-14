import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Cidade, Cep } from './brasilapi.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  baseUrl = 'https://brasilapi.com.br/api/ibge/';
  

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<Estado[]>{
    const path  = this.baseUrl + 'uf/v1';
    return this.http.get<Estado[]>(path);
}
  listarCidades(uf: string): Observable<Cidade[]>{
    const path  = this.baseUrl + 'municipios/v1/' + uf;
    
    return this.http.get<Cidade[]>(path);
}
informacoesCep(cep: string): Observable<Cep>{
  const path  = 'https://brasilapi.com.br/api/cep/v1/' + cep; 

  return this.http.get<Cep>(path);
}
}



