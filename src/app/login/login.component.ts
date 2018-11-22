import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient,  HttpErrorResponse  } from '@angular/common/http';
import { Observable} from 'rxjs/index';
import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

import { User, UserLoginData } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  user: User = new User();
  userLoginForm: FormGroup;

  loginUserUrl = 'http://127.0.0.1:8000/api/user/login/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  ngOnInit() {
    this.userLoginForm = new FormGroup({
      email: new FormControl(this.user.email ,
        [ Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      password: new FormControl(this.user.password,
        [ Validators.required])
    });
  }
  onSubmit(user: User) {
    console.log('user');
    console.log(user);
    console.log(typeof user);

    this.httpClient.post(this.loginUserUrl, user, this.httpOptions)
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

}
