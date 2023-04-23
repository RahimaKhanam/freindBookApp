import { UserService } from 'src/app/service/user/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private tostr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.isLoggedIn()) {
        if (route.url.length > 0) {
          let menu = route.url[0].path;
          if (menu == 'users') {
            if (this.userService.isAdmin() == true) {
              return true;
            } else {
              this.router.navigate(['']);
              this.tostr.warning('You dont have access.')
              return false;
            }
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
      else {
        this.router.navigate(['login']);
        return false;
      }
    }
  
}
