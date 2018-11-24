import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let auth_token = localStorage.getItem(
      'auth_token'
    );
    if (auth_token){
      console.log(auth_token);
      console.log(typeof auth_token);
    } else {
      console.log('No auth_token!')
    };
  }

}
