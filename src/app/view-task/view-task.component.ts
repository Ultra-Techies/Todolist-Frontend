import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from '../helpers/utils';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  public editTaskForm!: FormGroup;
  taskId: number;
  status: string;
  title: string | null = null;
  dueDate: string | null = null;
  description: string | null = null;

  completeDate: Date;
  localCompleteDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public modalRef: MdbModalRef<ViewTaskComponent>
  ) {}

  ngOnInit(): void {
    this.completeDate = new Date(new Date(this.dueDate).getTime());
    this.localCompleteDate = this.completeDate.toISOString();
    this.localCompleteDate = this.localCompleteDate.substring(
      0,
      this.localCompleteDate.length - 1
    );

    this.editTaskForm = this.formBuilder.group({
      task: [this.title, Validators.required],
      description: [this.description],
      dueDate: [new Date(this.dueDate), Validators.required],
    });
  }

  close(): void {
    const message = this.editTaskForm.value;

    //make sure message is not null or empty  before closing modal else show error
    if (message && this.taskId != null) {
      let header = new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', '*');
      let today = new Date();
      const newTaskData = {
        title: this.editTaskForm.value.task,
        description: this.editTaskForm.value.taskDescription,
        reminder: Utils.formatDate(this.editTaskForm.value.dueDate),
        dueDate: Utils.formatDate(this.editTaskForm.value.dueDate),
        createdTime: Utils.formatDate(today),
        status: this.status,
      };
      this.http
        .put(Utils.BASE_URL + 'task/update/' + this.taskId, newTaskData, {
          headers: header,
        })
        .subscribe(
          (res) => {
            this.toastr.success('Task Edited Succesfully!', 'Success');
            this.modalRef.close(message);
          },
          (err) => {
            console.log('Error: ' + err);
            this.toastr.error(
              'Task Edit Failed, ' + err.error.message,
              'Error'
            );
          }
        );
    } else {
      this.toastr.error('Task Edit failed!', 'Error');
    }
  }
}
