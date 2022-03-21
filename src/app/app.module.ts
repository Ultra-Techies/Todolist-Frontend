import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { TodoComponent } from './todo/todo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewTaskComponent } from './view-task/view-task.component';

// import { filter } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    AddtaskComponent,
    TodoComponent,
    LoginComponent,
    ModalComponent,
    ViewTaskComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MdbModalModule,
    MdbCollapseModule,
  ],
  entryComponents: [ModalComponent, ViewTaskComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
