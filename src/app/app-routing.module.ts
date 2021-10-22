import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { LoginActivateGuard } from './login-activate.guard';
import { LoginComponent } from './login/login.component';
import { RankComponent } from './rank/rank.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'rank', component:RankComponent},
  { path: '', component: BoardComponent, canActivate: [LoginActivateGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
