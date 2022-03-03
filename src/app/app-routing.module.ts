import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Component } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
// import { TodoComponent } from './todo/todo.component';
const routes: Routes = [
  {path:'', redirectTo:'signup', pathMatch:'full'},
  // { path: 'todo', component:TodoComponent},
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
