import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Utils from '../helpers/utils';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  imageSrc = 'assets/images/Avatar.png';
  imageAlt = 'Avatar';
  today: number = Date.now();
  loading = false;

  loggedInUser: any = {
    username: '',
    email: '',
    password: '',
  };

  public updateUserForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  userID: any;
  username: any = [];
  emailAddress: any = [];
  userPassword: any = [];
  photo: any = [];

  ngOnInit(): void {
    this.loading = false;
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
    console.log('ngOnInit');
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    //get user data from local storage
    let userId = localStorage.getItem('userId');

    if (userId === null) {
      this.router.navigate(['/login']);
      this.toastr.error('Please Login First!', 'Error');
    } else {
      this.loading = true;
      //call user api to get user details and make sure user still exists
      this.http
        .get(Utils.BASE_URL + 'user/' + userId, {
          headers: header,
        })
        .subscribe(
          (res: any) => {
            this.loading = false;
            this.loggedInUser = res;
            this.userID = userId;
          },
          (err: any) => {
            this.loading = false;
            this.toastr.error('Error, ' + err.error.message, 'Error');
            //redirect to login page
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        );
    }

    //make API call
    this.http
      .get(Utils.BASE_URL + 'user/' + userId, { headers: header })
      .subscribe(
        (res) => {
          this.loading = false;
          this.loggedInUser = Object.entries(res);

          //filter logged in user data to get value of key 'username'
          this.username = this.loggedInUser.filter(
            (item) => item[0] === 'username'
          );

          this.emailAddress = this.loggedInUser.filter(
            (item) => item[0] === 'email'
          );

          this.userID = userId;

          this.photo = this.loggedInUser.filter((item) => item[0] === 'photo');

          console.log(this.photo);
        },
        (err) => {
          this.loading = false;
          this.toastr.error('Error, ' + err.error.message, 'Error');
        }
      );

    this.updateUserForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Email: ['', Validators.email],
      Password: ['', Validators.required],
    });
  }
  Logout() {
    //clear local storage then redirect to login page
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('Logged Out Successfully!', 'Success');
  }
  updateProfile(user_id: any) {
    this.loading = true;
    console.log('Username: ' + this.username);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    //check if username, email, and password have been changed
    //if they have find out which ones have changed and create payload
    let payload = {};
    if (this.username[1] !== this.updateUserForm.value.Email) {
      payload['username'] = this.updateUserForm.value.Username;
    }
    if (this.emailAddress[1] !== this.updateUserForm.value.Email) {
      payload['email'] = this.updateUserForm.value.Email;
    }
    if (this.userPassword[1] !== this.updateUserForm.value.Password) {
      payload['password'] = this.updateUserForm.value.Password;
    }

    //generate payload url in format of
    //localhost: 8080/api/user/25?username=malcolmmaima&password=1234&name=Malcolm Maima&email=malcolm@gmail.com for every value that have changed
    //e.g. if only username has changed, the url would be localhost: 8080/api/user/25?username=malcolmmaima
    //if username and email have changed, the url would be localhost: 8080/api/user/25?username=malcolmmaima&password=1234&name=Malcolm Maima&email=malcolm@gmail.com
    //and so on
    let url = Utils.BASE_URL + 'user/' + user_id + '?';
    for (let key in payload) {
      url += '&' + key + '=' + payload[key];
    }

    //make API call
    this.http.put(url, {}, { headers: header }).subscribe(
      (res) => {
        this.loading = false;
        this.toastr.success('Profile Updated!', 'Success');
        console.log(res);
      },
      (err) => {
        this.loading = false;
        this.toastr.error(
          'Profile Update Failed, ' + err.error.message,
          'Error'
        );
      }
    );
  }

  deleteProfile(user_id: any) {
    this.loading = true;
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    //Call DELETE on endpoint /api/task/deletebyuserid/user_id
    this.http
      .delete(Utils.BASE_URL + 'task/deletebyuserid/' + user_id, {
        headers: header,
      })
      .subscribe(
        (res) => {
          console.log('All user tasks deleted successfully!');

          //Now delete account
          this.http
            .delete(Utils.BASE_URL + 'user/' + user_id, {
              headers: header,
            })
            .subscribe(
              (res) => {
                this.toastr.success('Profile Deleted!', 'Success');
                console.log(res);

                //redirect to login page
                localStorage.clear();
                this.router.navigate(['/login']);
              },
              (err) => {
                this.loading = false;
                this.toastr.error(
                  'Profile Delete Failed, ' + err.error.message,
                  'Error'
                );
                console.log(err);
              }
            );
        },
        (err) => {
          this.loading = false;
          this.toastr.error(
            'Profile Delete Failed, ' + err.error.message,
            'Error'
          );
        }
      );
  }
}
