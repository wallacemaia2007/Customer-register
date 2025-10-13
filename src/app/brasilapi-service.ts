import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from './brasilapi.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  baseUrl = 'https://brasilapi.com.br/api/ibge/uf/v1';
  

  constructor(private http: HttpClient) { }

  listarCep(): Observable<Estado[]>{
    return this.http.get<Estado[]>(this.baseUrl);
}
}



