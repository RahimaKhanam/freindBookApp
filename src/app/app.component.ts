import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'online-friendbook-app';

  isAdmin = false;
  isItemVisible = false;
  userData: any;

  constructor(private route: Router) {

    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);

    if (this.userData) {
      let admin = this.userData.isAdmin
      admin ? this.isAdmin = true : this.isAdmin = false;
    }
  }

  ngDoCheck(): void {
    let currentRoute = this.route.url;
    if (currentRoute == '/login' || currentRoute == '/register') {
      this.isItemVisible = false
    } else {
      this.isItemVisible = true
    }

    if (this.userData) {
      let admin = this.userData.isAdmin
      admin ? this.isAdmin = true : this.isAdmin = false;
    }
  }
}
