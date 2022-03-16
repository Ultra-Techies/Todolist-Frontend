import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  imageSrc: string = 'assets/images/logo.png';
  imageAlt: string = 'logo';

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("", [
        Validators.required,
      ])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.isSubmitted = true;
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigate(['profile']);
    }
  }
}
