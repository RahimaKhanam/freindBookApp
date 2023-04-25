import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from './../../service/posts/posts.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allPostsData: any;
  loggedInUser: any;

  createPostForm = this.builder.group({
    post: this.builder.control('', Validators.required),
  });

  constructor(private userService: UserService,
    private postsService: PostsService,
    private router: Router,
    private toastr: ToastrService,
    private builder: FormBuilder) { }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUserData();
    console.log(this.loggedInUser);
    this.getAllPost();
  }

  createPost() {
    this.createPostForm.value;
    let formData = {
      post: this.createPostForm.value.post,
      userId: this.loggedInUser._id,
      userName: this.loggedInUser.firstName + ' ' + this.loggedInUser.lastName,
      userPhotoId: this.loggedInUser.photoId,
      postImageId: "",
      isActive: true,
      isAdmin: false,
      profession: "President"
    }
    console.log(formData);
    this.postsService.createPost(formData).subscribe((response: any)=>{
      this.toastr.success(response.message, 'Post submitted successfully');
      this.getAllPost();
    })
  }

  getAllPost() {
    this.postsService.allPosts().subscribe((response) => {
      this.allPostsData = response;
      console.log(this.allPostsData);
    })
  }

  deletePost(id: any) {
    console.log(id);
    this.postsService.deletePost(id).subscribe((response) => {
      this.toastr.success("Data deleted successfully", 'Deleted successfully');
      this.getAllPost();
    })
  }
}
