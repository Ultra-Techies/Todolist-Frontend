import { HttpClient } from '@angular/common/http';
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
addTask(){
  this.http.post<any>("http://localhost:3000/created", this.addtaskForm.value)
  .subscribe(res=>{
alert("Task Added Successfully");
this.addtaskForm.reset();
this.router.navigate(['todo']);
  },(err:any)=>{
    alert("Unable to add task")
  })
}
showReminder(){
  // if(this.today= this.duedate){
    this.toastr.success("Your task is due")
  }
}

