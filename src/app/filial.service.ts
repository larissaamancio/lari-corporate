import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filial } from './new-filial/filial';

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  private headers = { 'Content-Type': 'application/json' };
  private filiaisUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getFiliais() {
    const headers = this.headers
    return this.http.get(this.filiaisUrl + 'filial',
      { headers });
  }

  create(body: any): Observable<any> {
    const headers = this.headers
    return this.http.post(this.filiaisUrl + 'filial', body,
      { headers });
  }
}
