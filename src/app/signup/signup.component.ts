import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  imageSrc = 'assets/images/logo.png'  
  imageAlt = 'Logo'
public signupForm !:FormGroup;
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router :Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Username:['', Validators.required], 
      Email:['', Validators.email],
      Password:['', Validators.required],
      ConfirmPassword:['', Validators.required]
      // confpwd:['']
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/SignupUsers", this.signupForm.value)
    .subscribe(res=>
      {
        alert("SignUp SuccessFull");
        this.signupForm.reset();
        this.router.navigate(['todo']);
      }, (err: any)=>{
        alert("Something went wrong")
      } )
 }

}
