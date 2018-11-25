import { Component, OnInit } from '@angular/core';
import { UserDataService} from '../_services/userdata.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private _userData: UserDataService) { }

  ngOnInit() {
    let auth_token = localStorage.getItem(
      'auth_token'
    );
    if (auth_token){
      console.log(auth_token);
      console.log(typeof auth_token);

      this._userData.getUserData()
        .subscribe(
          data => {
            console.log("GET Request is successful ");
            console.log(data);
            // save token to localstorage
            // let auth_token = data.token;
            // console.log(auth_token);
            // console.log(typeof auth_token);
            // localStorage.setItem('auth_token', auth_token);
            // // todo add authorization header to every request ->
            // // todo https://stackoverflow.com/questions/34464108/angular-set-headers-for-every-request/39866166
            // // redirect to main page
            // this.router.navigate(['/']);
          },
          error => {
            console.log("Error", error);
          }
        )

    } else {
      console.log('No auth_token!')
    };
  }

}
