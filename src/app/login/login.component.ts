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
          localStorage.setItem('auth_token', auth_token);
          // redirect to main page
          // window.location.href = '/';
          // window.location.reload();
          // this.router.navigate(['/'], { queryParams: { 'refresh': 1 }});
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["/"]));
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
