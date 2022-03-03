import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private authService: AuthService) {
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
      this.authService.login().subscribe(data => {
        data.forEach(cred => {
          if (cred.email == this.email.value && cred.password == this.password.value) {
            console.log("Login successful");
          } else {
            console.log("Login failed");
          }
        })
      });
    }
  }
}
