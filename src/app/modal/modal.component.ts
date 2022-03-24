import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from '../helpers/utils';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public addtaskForm!: FormGroup;
  today = new Date();

  completeDate: Date;
  localCompleteDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public modalRef: MdbModalRef<ModalComponent>
  ) {}

  ngOnInit(): void {
    this.addtaskForm = this.formBuilder.group({
      task: ['', Validators.required],
      duedate: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.completeDate = new Date(new Date(this.today).getTime());
    this.localCompleteDate = this.completeDate.toISOString();
    this.localCompleteDate = this.localCompleteDate.substring(
      0,
      this.localCompleteDate.length - 1
    );
  }

  close(): void {
    const message = this.addtaskForm.value;
    //make sure message is not null or empty  before closing modal else show error
    console.log('Date: ' + message.duedate);
    if (message) {
      let header = new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', '*');
      let userId = localStorage.getItem('userId');

      const newTaskData = {
        title: this.addtaskForm.value.task,
        description: this.addtaskForm.value.description,
        reminder: Utils.formatDate(this.addtaskForm.value.duedate),
        dueDate: Utils.formatDate(this.addtaskForm.value.duedate),
        createdTime: Utils.formatDate(this.today),
      };
      this.http
        .post(Utils.BASE_URL + 'task/add/' + userId, newTaskData, {
          headers: header,
        })
        .subscribe(
          (res) => {
            this.toastr.success('Task Added Succesfully!', 'Success');
            this.modalRef.close(message);
          },
          (err) => {
            console.log('Error: ' + err);
            this.toastr.error('Task Add Failed, ' + err.error.message, 'Error');
          }
        );
    } else {
      this.toastr.error('Task Add failed!', 'Error');
    }
  }
}
