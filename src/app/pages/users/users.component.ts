import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.allUsers().subscribe((response)=> {
      console.log(response);
    })

  }

}
