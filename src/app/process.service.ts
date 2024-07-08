import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private headers = { 'Content-Type': 'application/json' };
  private filiaisUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  create(body: any): Observable<any> {
    const headers = this.headers
    return this.http.post(this.filiaisUrl + 'process', body,
      { headers });
  }
}
