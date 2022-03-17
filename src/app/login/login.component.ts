import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import Utils from '../helpers/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  imageSrc = 'assets/images/logo.png';
  imageAlt = 'Logo';
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  login() {
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    const loginUserData = {
      email: this.loginForm.value.Email,
      password: this.loginForm.value.Password,
    };

    this.http
      .post<any>(Utils.BASE_URL + 'user/email/auth', loginUserData, {
        headers: header,
      })
      .subscribe(
        (res) => {
          if (res.email === this.loginForm.value.Email && res.id !== 0) {
            this.showToastMessage('Login Success!!');
            //save user id in local storage
            localStorage.setItem('userId', res.id);

            //wait for 3 seconds
            setTimeout(() => {
              this.loginForm.reset();
              this.router.navigate(['todo']);
            }, 3000);
          } else {
            this.showToastMessage('User not found!!', true);
            this.loginForm.reset();
          }
        },
        (err) => {
          alert('Error: ' + err.error.message);
        }
      );
  }

  showToastMessage(message: string = 'null', isError: boolean = false) {
    //if error is true then show error toast else show success toast
    if (isError) {
      this.toastr.error(message, 'Error');
    }
    this.toastr.success(message, 'Success');
  }
}
