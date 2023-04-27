import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload/file-upload.service';
import { FriendsService } from 'src/app/service/friends/friends.service';
import { PostsService } from 'src/app/service/posts/posts.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'side-profile',
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.scss']
})
export class SideProfileComponent implements OnInit {
  totalPosts: any;
  totalConnections: any;
  loggedInUser: any;
  allFriends: any = [];
  userImage: any;

  constructor(private userService: UserService,
    private postsService: PostsService,
    private friendsService: FriendsService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUserData();
    console.log(this.loggedInUser);
    let photoId = this.loggedInUser.photoId;
    let userId = this.loggedInUser._id;
    // For getting the profile photo
    this.fileUploadService.getFileOrPhotoById(photoId).subscribe((response: any) => {
      // converting blob to image format
      this.createImageFromBlob(response);
    })
    // For getting the posts count
    this.postsService.getPostsByUserId(userId).subscribe((response: any) => {
      console.log(response);
      response.length ? this.totalPosts = response.length : this.totalPosts = 0;
    })

    // For getting the connections count
    this.friendsService.allRequests().subscribe((response: any) => {
      console.log("allFriends", response);
      response.forEach((element: any) => {
        if (element.status == 'You are friend' && element.friendId == this.loggedInUser._id) {
          this.allFriends.push(element);
        }
      });
      this.allFriends.length ? this.totalConnections = this.allFriends.length : this.totalConnections = 0;
      console.log("filteredFriends", this.allFriends);
    })
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.userImage = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
