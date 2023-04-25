import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://3.17.216.66:3000/';

  createRequest(requestData: any) {
    return this.http.post(this.apiurl + 'friends/createrequest', requestData)
  }

  allRequests(){
    return this.http.get(this.apiurl+ 'friends/')
  }

  getRequestsByFriendId(id: any){
    return this.http.get(this.apiurl+ 'friends/' + id);
  }

  updateFriendRequestById(id: any, updatedRequest: any){
    return this.http.put(this.apiurl + 'friends/' + id, updatedRequest)
  }
}
