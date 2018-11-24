import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

import { User } from '../_models/user';
import { LoginUserService } from '../_services/loginuser.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _loginUserService: LoginUserService, private router: Router) {}
  user: User = new User();
  userLoginForm: FormGroup;


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

    this._loginUserService.loginUser(user)
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          // save token to localstorage
          let auth_token = data.token;
          console.log(auth_token);
          console.log(typeof auth_token);
          localStorage.setItem('auth_token', auth_token);
          // todo add authorization header to every request ->
          // todo https://stackoverflow.com/questions/34464108/angular-set-headers-for-every-request/39866166
          // redirect to main page
          this.router.navigate(['/']);
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
