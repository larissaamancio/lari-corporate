import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private filiaisUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  create(body: any): Observable<any> {
    return this.http.post<any>(`${this.filiaisUrl}process`, body, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.filiaisUrl}process`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  update(body: any): Observable<any> {
    return this.http.put<any>(`${this.filiaisUrl}process/${body.id}`, body, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
