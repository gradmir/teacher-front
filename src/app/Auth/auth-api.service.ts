import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {API_URL} from '../env';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthApiService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  login(nick_name: string, password: string): Promise<any>{
    return this.http
      .post(`${API_URL}/login`, { nick_name: nick_name, password: password}, {headers: this.headers})
      .toPromise();
  }

  logout(): Promise<any>{
    var token  = localStorage.getItem('token');
    var headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ${token}`});
    return this.http
      .post(`${API_URL}/logout`, { nick_name: "Ivan", password: "123"}, {headers: headers })
      .toPromise();
  }

  ensureAuthenticated(): Promise<boolean> {
    let url: string = `${API_URL}/status`;
    var token  = localStorage.getItem('token');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get<boolean>(url, {headers: headers}).toPromise();
  }
}