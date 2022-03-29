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
  loading = false;

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

    //get user id from local storage
    let userId = localStorage.getItem('userId');

    if (userId !== null) {
      this.router.navigate(['/todo']);
      this.toastr.success("You're already logged in!", 'Success');
    }

    this.loading = false;
  }
  login() {
    this.loading = true;
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');
    header.append('Access-Control-Allow-Headers', 'Content-Type');
    header.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );

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
            this.toastr.success('Login Successful!', 'Success');
            this.loading = false;
            //save user id in local storage
            localStorage.setItem('userId', res.id);

            //wait for 3 seconds
            setTimeout(() => {
              this.loginForm.reset();
              this.router.navigate(['todo']);
            }, 3000);
          } else {
            this.loading = false;
            this.toastr.error('Login Failed, user does not exist!', 'Error');
            this.loginForm.reset();
          }
        },
        (err) => {
          this.loading = false;
          this.toastr.error('Login Failed, ' + err.error.message, 'Error');
        }
      );
  }
}
