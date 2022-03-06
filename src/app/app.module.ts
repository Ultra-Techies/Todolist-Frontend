import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddtaskComponent } from './addtask/addtask.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    AddtaskComponent,
    
  ],
  imports: [
   BrowserModule,
   ReactiveFormsModule,
   AppRoutingModule,
   HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
