import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageSrc = 'assets/images/Avatar.png'  
  imageAlt = 'Avatar'
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.http.get('http://localhost:3000/SignupUsers')
    .subscribe(res=>{
      console.log('res',res)
    }

    )
  }

}
