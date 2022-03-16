import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  imageSrc = 'assets/images/logo.png'  
  imageAlt = 'Logo'
  json: string | undefined;

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
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    const postUserData = {
      username: this.signupForm.value.Username,
      email: this.signupForm.value.Email,
      password: this.signupForm.value.Password,
      name: this.signupForm.value.username
    };

    this.http.post<any>("http://localhost:8080/api/user", postUserData, {headers: header})
    .subscribe(res=>
      {
        alert("SignUp SuccessFull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, (err: any)=>{
        alert("Error: "+err.error.message);
        this.router.navigate(['signup']);
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
      } )
 }

}
