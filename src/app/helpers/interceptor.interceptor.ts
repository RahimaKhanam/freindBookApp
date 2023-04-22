import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  getToken() {
    let userData = JSON.parse(sessionStorage['userData']);
    let token = userData.token;
    return token;
  }

  constructor() {
    this.getToken()
   }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    })
    return next.handle(request);
  }
}
