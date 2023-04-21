import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateUser, NewUser } from 'src/app/modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://3.17.216.66:3000/';

  registerUser(newUser: NewUser) : Observable<NewUser> {
    return this.http.post<NewUser>(this.apiurl + 'users/register', newUser)
  }

  authenticateUserLogin(userData: AuthenticateUser): Observable<AuthenticateUser>{
    return this.http.post<AuthenticateUser>(this.apiurl + 'users/authenticate', userData)
  }
}
