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
  allPostsData: any = [];
  usersPosts: any = [];
  loggedInUser: any;

  createPostForm = this.builder.group({
    post: this.builder.control('', Validators.required),
  });

  constructor(private userService: UserService,
    private postsService: PostsService,
    private toastr: ToastrService,
    private builder: FormBuilder) { }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUserData();
    console.log(this.loggedInUser);
    this.getAllPost();
    this.getUsersPosts();
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
    this.postsService.createPost(formData).subscribe((response: any) => {
      this.toastr.success(response.message, 'Post submitted successfully');
      this.getUsersPosts();
    })
  }

  getAllPost() {
    this.postsService.allPosts().subscribe((response: any) => {
      response.forEach((ele: any) => {
        if (ele.userId != this.loggedInUser._id) {
          this.allPostsData.push(ele)
        }
      });
      console.log(this.allPostsData, "AllPosts");
    })
  }

  getUsersPosts() {
    let userId = this.loggedInUser._id;
    // For getting the posts of the loggedIn user
    this.postsService.getPostsByUserId(userId).subscribe((response: any) => {
      this.usersPosts = response;
      this.usersPosts.forEach((ele: any) => {
        ele.updateFlag = false;
      });
      console.log(response, "LoggedInUserPosts");

    })
  }

  updatePost(id: any) {
    this.usersPosts.forEach((ele: any) => {
      if (ele.id == id) {
        ele.updateFlag = true;
      }
    });
  }

  deletePost(id: any) {
    console.log(id);
    this.postsService.deletePost(id).subscribe((response) => {
      this.toastr.success("Data deleted successfully", 'Deleted successfully');
      this.getUsersPosts();
    })
  }

  saveUpdatedPost(form: any, postData: any){
    console.log(form.form.value.postData, postData);
    this.postsService.updatePost(postData.id, postData).subscribe((res: any)=>{
      this.toastr.success("Post updated successfully", 'Updated successfully');
      this.getUsersPosts();
    })
  }
  
}
