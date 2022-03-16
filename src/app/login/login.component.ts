import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private router: Router
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
      .post<any>('http://localhost:8080/api/user/email/auth', loginUserData, {
        headers: header,
      })
      .subscribe(
        (res) => {
          if (res.email === this.loginForm.value.Email && res.id !== 0) {
            alert('Login Success!!');
            //save user id in local storage
            localStorage.setItem('userId', res.id);

            this.loginForm.reset();
            this.router.navigate(['todo']);
          } else {
            alert('User not found!!');
          }
        },
        (err) => {
          alert('Error: ' + err.error.message);
        }
      );
  }
}
