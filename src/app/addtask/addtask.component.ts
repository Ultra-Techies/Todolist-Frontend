import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
public addtaskForm !:FormGroup;
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router : Router, private toastr:ToastrService) { }
  ngOnInit(): void {
    this.addtaskForm = this.formBuilder.group({
      task:['', Validators.required],
      duedate:['', Validators.required]
    })
    
  }
addTask() {
  let header = new HttpHeaders();
  header.append('Content-Type', 'application/json');
  header.append('Access-Control-Allow-Origin', '*');
  let userId = localStorage.getItem('userId');

  let today = new Date();

  const newTaskData = {
    title: this.addtaskForm.value.task,
    description: this.addtaskForm.value.task,
    reminder: this.formatDate(this.addtaskForm.value.duedate),
    dueDate: this.formatDate(this.addtaskForm.value.duedate),
    createdTime: this.formatDate(today)
  };

  this.http.post('http://localhost:8080/api/task/add/'+userId, newTaskData, {headers: header})
  .subscribe(res => {
    this.showToastMessage("Task added successfully");
    this.addtaskForm.reset();
    window.location.reload();
  }, err => {
    console.log("Error: "+err);
    this.showToastMessage("Unable to add task, try again!");
  })
}

showToastMessage(message:string = "Your task is due"){
    this.toastr.success(message)
  }
  
  //a function that takes date/time and converts it to this format: 2022-08-18 00:44:21
  formatDate(date){
    let date_ = new Date(date);
    let dd = String(date_.getDate()).padStart(2, '0');
    let mm = String(date_.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date_.getFullYear();
    let hh = String(date_.getHours()).padStart(2, '0');
    let min = String(date_.getMinutes()).padStart(2, '0');
    let sec = String(date_.getSeconds()).padStart(2, '0');
    let newDate = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;
    return newDate;
  }
}

