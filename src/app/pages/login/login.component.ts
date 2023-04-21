import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: this.builder.control('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
  });
  loading = false;


  constructor(private builder: FormBuilder, private toastr: ToastrService, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.loading = true;
    // let userData: User = {
    //   firstName: this.registerForm.value.firstName,
    //   lastName: this.registerForm.value.lastName,
    //   email: this.registerForm.value,
    //   dob: this.registerForm.value.dob,
    //   gender: this.registerForm.value,
    //   password: this.registerForm.value,
    // }
    // if (this.loginForm.valid) {
    //   console.log(this.loginForm.value);
    //   this.userService.registerUser(this.loginForm.value).subscribe((result: any) => {
    //     this.toastr.success(result.message, 'Registered successfully')
    //     this.router.navigate(['login'])
    //   });
    // } else {
    //   this.toastr.warning('Please enter valid data.');
    //   this.loading = false;
    // }
  }

}
