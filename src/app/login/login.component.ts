import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl("jean@kyosk.app"),
      password: new FormControl("*******")
    });
  }

  login() {
    console.log(this.loginForm.value);
  }

  ngOnInit(): void {
  }

}
