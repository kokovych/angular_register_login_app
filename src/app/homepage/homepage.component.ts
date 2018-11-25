import { Component, OnInit } from '@angular/core';
import { UserDataService} from '../_services/userdata.service';

import { CheckAuthService } from '../_services/check-auth.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private _userData: UserDataService, private _checkAuth: CheckAuthService) { }

  ngOnInit() {
    let userIsAuthorize: boolean;
    userIsAuthorize = this._checkAuth.isAuthorized();
    if (userIsAuthorize){
      console.log('userIsAuthorize: ', userIsAuthorize);

      this._userData.getUserData()
        .subscribe(
          data => {
            console.log("GET Request is successful ");
            console.log(data);
            let username = data.username;
          },
          error => {
            console.log("Error", error);
          }
        )

    } else {
      console.log('userIsAuthorize: ', userIsAuthorize);
      console.log('No auth_token!');
    };
  }

}
