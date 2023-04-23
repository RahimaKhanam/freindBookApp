import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  getToken() {
    let userData = JSON.parse(sessionStorage['userData']);
    let token = userData.token;
    return token;
  }

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(this.router.routerState.snapshot.url);

    if (this.router.routerState.snapshot.url !== '/login' && this.router.routerState.snapshot.url !== '/register') {
      // console.log("It should not exceute for login and register but executed.");
      request = request.clone({
        setHeaders: ({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        })
      })
    }
    return next.handle(request);
  }
}
