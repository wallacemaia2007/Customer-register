import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from './brasilapi.models';

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
  listarMunicipios(uf: string): Observable<Municipio[]>{
    const path  = this.baseUrl + 'municipios/v1/' + uf;
    
    return this.http.get<Municipio[]>(path);
}
}



