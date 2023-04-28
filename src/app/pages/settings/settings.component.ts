import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loggedInUser: any;
  updateFlag = false;

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUserData();
    console.log(this.loggedInUser);
  }

  updateDetails() {
    this.updateFlag = true;

  }

  saveUpdatedDetails(formData: any) {
    let data = formData.form.value;
    console.log(data);
    this.userService.updateUser(this.loggedInUser._id, data).subscribe((res: any)=>{
      this.toastr.success("Please login again.", 'Data Updated successfully');
      this.router.navigate(['login'])
    })
  }

}
