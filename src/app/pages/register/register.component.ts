import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from 'src/app/modals/user';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    // username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    email: this.builder.control('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    gender: this.builder.control('', Validators.required),
    dob: this.builder.control('', Validators.required),
    password: this.builder.control('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    // confirmPassword: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
  });
  loading = false;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.loading = true;

    let userData: NewUser = {
      firstName: this.registerForm.value.firstName as string,
      lastName: this.registerForm.value.lastName as string,
      email: this.registerForm.value.email as string,
      dob: this.registerForm.value.dob as string,
      gender: this.registerForm.value.gender as string,
      password: this.registerForm.value.password as string,
    }

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.userService.registerUser(userData).subscribe((result: any) => {
        this.toastr.success(result.message, 'Registered successfully')
        this.router.navigate(['login'])
      });
    } else {
      this.toastr.warning('Please enter valid data.');
      this.loading = false;
    }
  }

}
