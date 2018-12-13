import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserRegistrationData } from '../_models/user';

@Injectable()
export class RegistrationUserService {
  constructor(
    private httpClient: HttpClient) { }
  registrationUserUrl = 'http://127.0.0.1:8000/api/user/registration/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  registrationUser(_userRegistration: UserRegistrationData): Observable<any>{
    return this.httpClient.post<any>(this.registrationUserUrl, _userRegistration, this.httpOptions)
  }
}
