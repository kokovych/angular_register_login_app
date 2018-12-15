import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

import { User } from '../_models/user';
import { UserRegistrationData} from '../_models/user';
import { CheckAuthService } from "../_services/check-auth.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private router: Router,
    private _checkAuth: CheckAuthService) { }

  user: UserRegistrationData = new UserRegistrationData();
  userRegistrationForm: FormGroup;
  userIsAuthorized: boolean = this._checkAuth.isAuthorized();

  ngOnInit() {
    this.userRegistrationForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      username: new FormControl(this.user.username),
      email: new FormControl(this.user.email,
        [ Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      password: new FormControl(this.user.password,
        [ Validators.required]),
      passwordConfirm: new FormControl(this.user.passwordConfirm,
        [ Validators.required,  ])
    });
  }
  onSubmit(user: UserRegistrationData) {
    console.log('user');
    console.log(user);
    console.log(typeof user);
  }

  get firstName() {
    return this.userRegistrationForm.get('firstName');
  }

  get lastName() {
    return this.userRegistrationForm.get('lastName');
  }

  get username() {
    return this.userRegistrationForm.get('username');
  }

  get email() {
    return this.userRegistrationForm.get('email');
  }

  get password() {
    return this.userRegistrationForm.get('password');
  }

  get passwordConfirm() {
    return this.userRegistrationForm.get('passwordConfirm');
  }

}
