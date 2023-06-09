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
  userData: any;

  registerUser(newUser: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(this.apiurl + 'users/register', newUser)
  }

  authenticateUserLogin(userData: AuthenticateUser): Observable<AuthenticateUser> {
    return this.http.post<AuthenticateUser>(this.apiurl + 'users/authenticate', userData)
  }

  allUsers() {
    return this.http.get(this.apiurl + 'users/')
  }

  getUserById(userId: any) {
    // key is _id
    return this.http.get(this.apiurl + 'users/' + userId)
  }

  getUserByEmail(email: any) {
    // key is email
    return this.http.post(this.apiurl + 'users/finduserbyemail', { email: email })
  }

  updateUserPhotoId(userId: any) {
    // send id and photoId
    return this.http.post(this.apiurl + 'users/updateuserphotoId', userId)
  }

  updateUser(id: any, updatedUser: any) {
    return this.http.put(this.apiurl + 'users/' + id, updatedUser)
  }

  getUserData(){
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    return this.userData;
  }

  isLoggedIn() {
    return sessionStorage.getItem('userData') != null;
  }

  isAdmin() {
    let data = this.getUserData();
    let adminFlag = data.isAdmin;
    return adminFlag;
  }

}
