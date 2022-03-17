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
  }

  close(): void {
    const message = this.addtaskForm.value;
    //make sure message is not null or empty  before closing modal else show error
    if (message) {
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
            this.modalRef.close(message);
          },
          (err) => {
            console.log('Error: ' + err);
            this.showToastMessage('Unable to add task, try again!', true);
          }
        );
    } else {
      this.showToastMessage('Unable to add task, try again!', true);
    }
  }

  showToastMessage(message: string = 'null', isError: boolean = false) {
    //if error is true then show error toast else show success toast
    if (isError) {
      this.toastr.error(message, 'Error');
    }
    this.toastr.success(message, 'Success');
  }
}
