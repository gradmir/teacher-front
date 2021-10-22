import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {API_URL} from '../env';
import {Work} from './work.model';
import { Observable, throwError } from 'rxjs';
import { catchError,map} from 'rxjs/operators';
import { Week } from './week.model';

@Injectable()
export class WorksApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getWeek(start_date: Date): Promise<Week> {
    var token  = localStorage.getItem('token');
    var headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ${token}`});
    var params = new HttpParams().set('start_date', start_date.toISOString().slice(0,10));
    return this.http
      //.get(`${API_URL}/works`, {headers: this.headers }).toPromise();
      //.post(`${API_URL}/week`, {startdate: '20210906'}, { headers: headers }).toPromise();
      
      .get<Week>(`${API_URL}/week`,{params: {start_date:  start_date.toISOString().slice(0,10)}, headers: headers })
      .pipe(map((res)=>new Week(res)))
      .toPromise();
      //.pipe(map((week: Week) => week.map(week => new Week(week))))
      //.toPromise();
      //.pipe(catchError(WorksApiService._handleError));
  }

  saveWeek(week: Week): Promise<any>{
    var token  = localStorage.getItem('token');
    var headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ${token}`});
    return this.http
      .post(`${API_URL}/setWeek`, week, {headers: headers })
      .toPromise();
  }
}