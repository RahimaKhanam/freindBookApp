import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://3.17.216.66:3000/';

  registerUser(newUser: any) {
    return this.http.post(this.apiurl + 'users/register', newUser)
  }
}
