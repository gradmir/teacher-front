import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../env';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsApiService {

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 
  'Access-Control-Allow-Origin': '*'});

  constructor(private http: HttpClient) {
  }

  addPushSubscriber(subscription_json: PushSubscription){
    return this.http
    .post(`${API_URL}/api/subscription/add`, { subscription_json: subscription_json}, {headers: this.headers})
    .toPromise();
  }

  removePushSubscriber(subscription_json: PushSubscription){
    return this.http
    .post(`${API_URL}/api/subscription/remove`, { subscription_json: subscription_json}, {headers: this.headers})
    .toPromise();
  }
}
