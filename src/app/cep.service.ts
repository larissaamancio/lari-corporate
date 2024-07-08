import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  getAddressByCep(cep: string): Observable<any> {
    return this.http.get<any>(`${this.viaCepUrl}/${cep}/json/`);
  }
}