import { Component, OnInit } from '@angular/core';
import { UserDataService} from '../_services/userdata.service';
import { Router, NavigationEnd } from '@angular/router';

import { CheckAuthService } from '../_services/check-auth.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router,private _userData: UserDataService, private _checkAuth: CheckAuthService){
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

  }

  // constructor(
  //   private _userData: UserDataService, private _checkAuth: CheckAuthService) { }

  ngOnInit() {
    console.log("You aer in on init of hamepage!");
    let userIsAuthorized: boolean;
    userIsAuthorized = this._checkAuth.isAuthorized();
    console.log("userIsAuthorized====>>");
    console.log(userIsAuthorized);
    if (userIsAuthorized){
      console.log('userIsAuthorized: ', userIsAuthorized);

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
      console.log('userIsAuthorized: ', userIsAuthorized);
      console.log('No auth_token!');
    };
  }

}
