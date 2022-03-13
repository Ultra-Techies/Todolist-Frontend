import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imageSrc = 'assets/images/logo.png'  
  imageAlt = 'Logo'
public loginForm !:FormGroup;
  constructor( private formBuilder : FormBuilder,private http:HttpClient, private router :Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email:['', Validators.required],
      Password:['', Validators.required ],
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/SignupUsers")
    .subscribe(res=>
      {
     const user= res.find((a:any)=>{
       return a.Email ===this.loginForm.value.Email && a.Password ===this.loginForm.value.Password
     });
     if(user){
       alert("Login Success!!");
       this.loginForm.reset()
       this.router.navigate(['todo'])
     }else{
       alert("User not found!!")
     }
      
      },err=>{
        alert("Something went wrong!!")
      })
 }
}
