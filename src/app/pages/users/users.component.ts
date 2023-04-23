import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userlist: any;
  dataSource: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dob', 'gender', 'isActive', 'isAdmin', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.allUsers().subscribe((response)=> {
      console.log(response);
      this.userlist = response;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  updateUser(code: any) {
    // this.openDialog(code);
  }

  // openDialog(code: string) {
  //   const popup = this.dialog.open(UpdatepopupComponent, 
  //     {
  //       width: '30%',
  //       data: {
  //         usercode: code
  //       }
  //     }
  //     );
  //   popup.afterClosed().subscribe(res => {
  //     this.loadUser();
  //   });
  // }

}
