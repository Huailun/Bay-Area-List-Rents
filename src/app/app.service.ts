import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  username: string;

  constructor(private http: HttpClient) {}

  // Returns all members
  getListRents() {
    const api = 'https://data.bayareametro.gov/resource/vpmm-yh3p.json';
    return this.http
      .get(`${api}`)
      .pipe(
        catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}