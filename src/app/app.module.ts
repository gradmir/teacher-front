import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivitiesApiService } from './Acitivities/activities-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthApiService } from './Auth/auth-api.service';
import { ClassesApiService } from './Classes/classes-api.service';
import { WorksApiService } from './Works/works-api.service';
import { LoginComponent } from './login/login.component';
import { Router, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { RankComponent } from './rank/rank.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    RankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,//environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ClassesApiService, ActivitiesApiService, AuthApiService, WorksApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
