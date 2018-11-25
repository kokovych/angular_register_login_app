import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User, UserLoginData } from '../_models/user';

@Injectable()
export class UserDataService {
  constructor(
    private httpClient: HttpClient) { }
  loginUserUrl = 'http://127.0.0.1:8000/api/user/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  getUserData(): Observable<any>{
    return this.httpClient.get<any>(this.loginUserUrl)
  }
}
