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
    ReactiveFormsModule
  ],
  providers: [ClassesApiService, ActivitiesApiService, AuthApiService, WorksApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
