import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from '../helpers/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  imageSrc = 'assets/images/logo.png';
  imageAlt = 'Logo';
  json: string | undefined;

  public signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Email: ['', Validators.email],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      // confpwd:['']
    });
  }
  signUp() {
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    const postUserData = {
      username: this.signupForm.value.Username,
      email: this.signupForm.value.Email,
      password: this.signupForm.value.Password,
      name: this.signupForm.value.username,
    };

    this.http
      .post<any>(Utils.BASE_URL + 'user', postUserData, { headers: header })
      .subscribe(
        (res) => {
          this.showToastMessage('Signup SuccessFul', false);

          //wait for 3 seconds
          setTimeout(() => {
            this.signupForm.reset();
            this.router.navigate(['login']);
          }, 3000);
        },
        (err: any) => {
          this.showToastMessage('Error: ' + err.error.message, true);
          this.router.navigate(['signup']);
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
        }
      );
  }

  showToastMessage(message: string = 'null', isError: boolean = false) {
    //if error is true then show error toast else show success toast
    if (isError) {
      this.toastr.error(message, 'Error');
    } else {
      this.toastr.success(message, 'Success');
    }
  }
}
