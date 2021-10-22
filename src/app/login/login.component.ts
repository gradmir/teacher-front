import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../Auth/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password:string;
  nick_name:string;  
  LoginForm:FormGroup;

  constructor(
    private authService: AuthApiService, private router:Router){
    
    }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'nick_name': new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required]),
    });
  }

  login() {
    if (!this.LoginForm.valid){
      alert('Введите имя пользователя и пароль')
      return
    }

    this.authService.login(this.LoginForm.get('nick_name')?.value, this.LoginForm.get('password')?.value)
      .then((res: { auth_token: string; })=> {
          console.log(res);
          if (res.auth_token){
            localStorage.setItem('token', res.auth_token);
            this.router.navigate(['']); 
          } else {
            alert('Неверный логин или пароль')
          }
      })
  
  }

}
