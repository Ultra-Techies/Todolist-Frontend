import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imageSrc = 'assets/images/Avatar.png'  
  imageAlt = 'Avatar'
  today: number = Date.now();
  constructor(private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  showToaster(){
   
      this.toastr.success("Your task is due")
  }
}
