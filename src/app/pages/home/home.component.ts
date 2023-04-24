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
    private tostr: ToastrService) { }

  ngOnInit(): void {
    let data = this.userService.getUserData();
    console.log(data);
    this.postsService.allPosts().subscribe((response)=> {
      console.log(response);
      this.allPostsData = response;
      
    })
  }

}
