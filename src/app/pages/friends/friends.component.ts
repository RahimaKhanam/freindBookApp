import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/service/friends/friends.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  allFriends: any = [];
  userData: any = [];
  loggedInUser: any;

  constructor(private userService: UserService,
    private friendsService: FriendsService) { }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUserData();

    this.friendsService.allRequests().subscribe((response: any) => {
      console.log("allFriends", response);
      response.forEach((element: any) => {
        if (element.status == 'You are friend' && element.friendId == this.loggedInUser._id) {
          this.allFriends.push(element);
          this.userService.getUserById(element.userId).subscribe((res: any) => {
            element.name = res.firstName + " " + res.lastName;
            element.email = res.email
          })
        }
      });
      console.log("filteredFriends", this.allFriends);
    })

    // this.userService.getUserById("6445526b54b3bd0c3cbd2312").subscribe((res: any) => {
    //   console.log(res, "Saska");
    // })
  }

}
