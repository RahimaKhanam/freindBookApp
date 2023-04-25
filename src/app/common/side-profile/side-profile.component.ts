import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload/file-upload.service';
import { PostsService } from 'src/app/service/posts/posts.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'side-profile',
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.scss']
})
export class SideProfileComponent implements OnInit {
  totalPosts: any;
  loggedInUser: any;

  constructor(private userService: UserService,
    private postsService: PostsService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
     this.loggedInUser = this.userService.getUserData();
    console.log(this.loggedInUser);
    let photoId = this.loggedInUser.photoId;
    let userId = this.loggedInUser._id;
    // For getting the profile photo
    this.fileUploadService.getFileOrPhotoById(photoId).subscribe((response: any) => {
      console.log(response);
    })
    // For getting the posts count
    this.postsService.getPostsByUserId(userId).subscribe((response: any) => {
      console.log(response);
      response.length ? this.totalPosts = response.length : this.totalPosts = 0;
    })

  }

}
