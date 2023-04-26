import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'online-friendbook-app';

  isAdmin = false;
  isItemVisible = false;
  userData: any;

  constructor(private route: Router,
    private userService: UserService) {
  }
  ngOnInit(): void {
    // sessionStorage.clear();
    this.userData = this.userService.getUserData();

    if (this.userData) {
      this.userData.isAdmin == true ? this.isAdmin = true : this.isAdmin = false;
      // this.isAdmin = this.userData.isAdmin
    }  }


  ngDoCheck(): void {
    let currentRoute = this.route.url;
    if (currentRoute == '/login' || currentRoute == '/register') {
      this.isItemVisible = false
    } else {
      this.isItemVisible = true
    }

    if (this.userData) {
      this.userData.isAdmin == true ? this.isAdmin = true : this.isAdmin = false;
      // this.isAdmin = this.userData.isAdmin;
    }
  }
}
