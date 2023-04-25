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

  constructor(private userService: UserService,
    private postsService: PostsService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    let loginUser = this.userService.getUserData();
    console.log(loginUser);
    this.getAllPost();
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
