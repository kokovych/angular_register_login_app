import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import {Observable} from "rxjs/index";
import { catchError, retry } from 'rxjs/operators';
import {Http, Response} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { User, UserLoginData } from '../_models/user';

@Injectable()
export class LoginUserService {
  constructor(
    private httpClient: HttpClient) { }
  loginUserUrl = 'http://127.0.0.1:8000/api/user/login/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  loginUser(user: User): Observable<UserLoginData>{
    return this.httpClient.post<UserLoginData>(this.loginUserUrl, user, this.httpOptions)
  }
}
