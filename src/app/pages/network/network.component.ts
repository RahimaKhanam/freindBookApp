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
    console.log(this.loggedInUser);

    this.getAllRequests();

    this.userService.allUsers().subscribe((response: any) => {
      // console.log("All Users", response);
      response.forEach((element: any) => {
        var createdDate = new Date(element.createdDate);
        // this will display us only the users of 2023 and month april 
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
        if (element.status == 'Request Pending' && element.friendId == this.loggedInUser._id) {
          this.allRequests.push(element);
        }
      });
      console.log("filteredRequests", this.allRequests);
    })
  }

  connect(id: any) {
    let sendRequest = {
      userId: this.loggedInUser._id,
      friendId: id,
      status: "Request Pending"
    }
    this.friendsService.createRequest(sendRequest).subscribe((response: any) => {
      this.toastr.success(response.message, 'Request Sent');
    })
  }

  approveRequest(friendId: any, id: any) {
    let sendRequest = {
      userId: this.loggedInUser._id,
      friendId: friendId,
      status: "You are friend"
    }
    this.friendsService.updateFriendRequestById(id, sendRequest).subscribe((response: any) => {
      this.toastr.success(response.message, 'Request Accepted');
      this.getAllRequests();
    })
  }

  cancelRequest(friendId: any, id: any) {
    let sendRequest = {
      userId: this.loggedInUser._id,
      friendId: friendId,
      status: "Request Cancelled"
    }
    this.friendsService.updateFriendRequestById(id, sendRequest).subscribe((response: any) => {
      this.toastr.success(response.message, 'Request Cancelled');
      this.getAllRequests();
    })
  }
}
