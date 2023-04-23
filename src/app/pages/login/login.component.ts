import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateUser } from 'src/app/modals/user';
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
    sessionStorage.clear()
  }

  loginUser() {
    this.loading = true;
    let userData: AuthenticateUser = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string,
    }
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.authenticateUserLogin(userData).subscribe((result: any) => {
        console.log(result);
        sessionStorage.setItem('userData', JSON.stringify(result));
        let userData = JSON.parse(sessionStorage['userData']);
        let token = userData.token;
        console.log(token);
        
        this.toastr.success("You have logged in successfully", 'Loggedin successfully')
        this.router.navigate(['home'])
      });
    } else {
      this.toastr.warning('Please enter valid data.');
      this.loading = false;
    }
  }

}
