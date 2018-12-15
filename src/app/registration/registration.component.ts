import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder,  ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { User } from '../_models/user';
import { UserRegistrationData} from '../_models/user';
import { CheckAuthService } from "../_services/check-auth.service";
import { MustMatch } from '../_services/must-mutch.validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private router: Router,
    private _checkAuth: CheckAuthService,
    private formBuilder: FormBuilder) { }

  user: UserRegistrationData = new UserRegistrationData();
  userRegistrationForm: FormGroup;
  userIsAuthorized: boolean = this._checkAuth.isAuthorized();

  ngOnInit() {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      username: new FormControl(this.user.username),
      email: new FormControl(this.user.email,
        [ Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      password: new FormControl(this.user.password,
        [ Validators.required]),
      passwordConfirm: new FormControl(this.user.passwordConfirm,
        [ Validators.required ])
    }, {
      validator: MustMatch("password", "passwordConfirm") });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userRegistrationForm.controls; }

  onSubmit(user: UserRegistrationData) {
    console.log('user');
    console.log(user);
    console.log(typeof user);
  }

}
