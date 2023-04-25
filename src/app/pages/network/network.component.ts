import { UserService } from 'src/app/service/user/user.service';
import { FriendsService } from './../../service/friends/friends.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  allRequests: any = [];
  userData: any = [];
  loggedInUser: any;

  constructor(private userService: UserService,
    private friendsService: FriendsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUserData();

    this.getAllRequests();

    this.userService.allUsers().subscribe((response: any) => {
      // console.log("All Users", response);
      response.forEach((element: any) => {
        var createdDate = new Date(element.createdDate);
        // we will display  only the users of 2023 and month april 
        // && it should not display the user who is logged in 
        if (createdDate.getFullYear() == 2023 && createdDate.getMonth() == 3
          && element.id != this.loggedInUser._id) {
          this.userData.push(element);
        }
      });
      console.log("userData", this.userData);
    });

    // this.friendsService.getRequestsByFriendId("60df788cd2b7a9000499df5c").subscribe((response: any) => {
    //   console.log(response);
    // })
  }

  getAllRequests() {
    this.friendsService.allRequests().subscribe((response: any) => {
      console.log("allRequests", response);
      response.forEach((element: any) => {
        // To display only the pending request and also only the requests that were sent to the current loggedIn user
        // To get this we will check the value with friendId since this keys stores id of the person to whom request was sent
        // And since the request was sent to us so we check it with element.friendId == this.loggedInUser._id
        if (element.status == 'Request Pending' && element.friendId == this.loggedInUser._id) {
          this.allRequests.push(element);
        }
      });
      console.log("filteredRequests", this.allRequests);
    })
  }

  connect(id: any) {
    let sendRequest = {
      userId: this.loggedInUser._id, // who is sending the request
      friendId: id, // to whom request is sent
      status: "Request Pending" // status
    }
    this.friendsService.createRequest(sendRequest).subscribe((response: any) => {
      this.toastr.success(response.message, 'Request Sent');
    })
  }

  approveRequest(data: any) {
    // We wont change the userId and friendId here, we will send back the same ids stored
    // just with different status
    let sendRequest = {
      userId: data.userId,
      friendId: data.friendId,
      status: "You are friend"
    }
    this.friendsService.updateFriendRequestById(data.id, sendRequest).subscribe((response: any) => {
      this.toastr.success(response.message, 'Request Accepted');
      window.location.reload()
    })
  }

  cancelRequest(data: any) {
    let sendRequest = {
      userId: data.userId,
      friendId: data.friendId,
      status: "Request Cancelled"
    }
    this.friendsService.updateFriendRequestById(data.id, sendRequest).subscribe((response: any) => {
      this.toastr.success(response.message, 'Request Cancelled');
      window.location.reload()
    })
  }
}
