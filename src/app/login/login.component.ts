import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

import { User } from '../_models/user';
import { LoginUserService } from '../_services/loginuser.service';
import { CheckAuthService } from "../_services/check-auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private _loginUserService: LoginUserService,
    private router: Router,
    private _checkAuth: CheckAuthService) {
    // add this part because fow working router.navigate in Firefox
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
  user: User = new User();
  userLoginForm: FormGroup;
  userIsAuthorized: boolean = this._checkAuth.isAuthorized();
  errorLogin: boolean = false;
  errorLoginDescription: string = '';

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
          localStorage.setItem('auth_token', auth_token);
          // redirect to main page

          console.log("before navigate");
          // this.ngZone.run(() => this.router.navigateByUrl("/"))
          this.router.navigate(['/']);
          // window.location.href = '/';
          // window.location.reload();

        },
        error => {
          console.log("Error", error);
          this.errorLogin = true;
          console.log(error.error.description);
          this.errorLoginDescription = error.error.description;
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
