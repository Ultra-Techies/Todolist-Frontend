import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Utils from '../helpers/utils';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
})
export class AddtaskComponent implements OnInit {
  public addtaskForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.addtaskForm = this.formBuilder.group({
      task: ['', Validators.required],
      duedate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  addTask() {
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');
    let userId = localStorage.getItem('userId');

    let today = new Date();

    const newTaskData = {
      title: this.addtaskForm.value.task,
      description: this.addtaskForm.value.description,
      reminder: Utils.formatDate(this.addtaskForm.value.duedate),
      dueDate: Utils.formatDate(this.addtaskForm.value.duedate),
      createdTime: Utils.formatDate(today),
    };

    this.http
      .post(Utils.BASE_URL + 'task/add/' + userId, newTaskData, {
        headers: header,
      })
      .subscribe(
        (res) => {
          this.showToastMessage('Task added successfully');
          this.router.navigate(['todo']);
          this.addtaskForm.reset();
        },
        (err) => {
          console.log('Error: ' + err);
          this.showToastMessage('Unable to add task, try again!');
        }
      );
  }

  showToastMessage(message: string = 'null') {
    this.toastr.success(message);
  }
}
