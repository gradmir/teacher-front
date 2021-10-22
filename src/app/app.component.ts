import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivitiesApiService } from './Acitivities/activities-api.service';
import { AuthApiService } from './Auth/auth-api.service';
import { Class } from './Classes/class.model';
import { ClassesApiService } from './Classes/classes-api.service';
import { API_URL } from './env';
import { Week } from './Works/week.model';
import { WorksApiService } from './Works/works-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}