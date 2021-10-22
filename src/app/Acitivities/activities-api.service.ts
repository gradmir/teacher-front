import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../env';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activity } from './acitvity.model';

@Injectable()
export class ActivitiesApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getActivities(): Observable<Activity[]> {
    return this.http
      .get<Activity[]>(`${API_URL}/activities`)
      .pipe(catchError(ActivitiesApiService._handleError));
  }

  getRank(start_date: Date, end_date: Date): Promise<any>{
    let url: string = `${API_URL}/rank`;
    var token  = localStorage.getItem('token');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url,{params: {start_date:  start_date.toISOString().slice(0,10), end_date: end_date.toISOString().slice(0,10)}, headers: headers}).toPromise();
  }
}