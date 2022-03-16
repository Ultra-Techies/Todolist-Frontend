import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Utils from '../helpers/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  imageSrc = 'assets/images/Avatar.png';
  imageAlt = 'Avatar';
  SignupUser: any = {
    Username: '',
    Email: '',
    Password: '',
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    //get user data from local storage
    let userId = localStorage.getItem('userId');

    //make API call
    this.http
      .get(Utils.BASE_URL + '/user/' + userId, { headers: header })
      .subscribe((res) => {
        this.SignupUser = res;
        console.log(this.SignupUser);
      });
  }
}
