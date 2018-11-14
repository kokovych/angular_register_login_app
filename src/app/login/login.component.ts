import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {User} from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    ) { }
  user: User = new User();
  userLoginForm: FormGroup;
  ngOnInit() {
    this.userLoginForm = new FormGroup({
      email: new FormControl(this.user.email ,
        [ Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
      password: new FormControl(this.user.password,
        [ Validators.required])
    });
  }
  onSubmit(data) {
    console.log(this.user);
    console.log(data);

  }

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

}
