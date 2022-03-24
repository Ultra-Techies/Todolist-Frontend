import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Utils from '../helpers/utils';
import * as $ from 'jquery';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ViewTaskComponent } from '../view-task/view-task.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  modalRef: MdbModalRef<ViewTaskComponent> | null = null;
  imageSrc = 'assets/images/Avatar.png';
  imageAlt = 'Avatar';
  loading = false;
  today: number = Date.now();

  SignupUser: any = {
    Username: '',
    Email: '',
    Password: '',
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private modalService: MdbModalService
  ) {}

  userID: any;
  created: any = [''];
  posts: any = [];
  done: any = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.updateTask(
        event.previousContainer.data[event.previousIndex],
        event.container.id
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  ngOnInit(): void {
    this.loading = false;
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    //fetch userid from local storage
    let userId = localStorage.getItem('userId');

    //check if user id is in local storage, if not redirect to login page
    if (userId === null) {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.toastr.error('Please Login First!', 'Error');
    } else {
      this.loading = true;
      //call user api to get user details and make sure user still exists
      this.http
        .get(Utils.BASE_URL + 'user/' + userId, {
          headers: header,
        })
        .subscribe(
          (res: any) => {
            this.userID = userId;
            this.SignupUser.Username = res.username;
            this.SignupUser.Email = res.email;
            this.SignupUser.Password = res.password;
            this.imageSrc = res.photo;
            this.imageAlt = res.username;
            this.loading = false;
          },
          (err: any) => {
            this.toastr.error('Error, ' + err.error.message, 'Error');
            //redirect to login page
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        );
    }

    //call api to get all tasks
    this.http
      .get(Utils.BASE_URL + 'task/' + userId, { headers: header })
      .subscribe(
        (res) => {
          const createdTasks = Object.values(res);
          console.log('Tasks: ', createdTasks);

          //filter tasks
          this.created = createdTasks.filter(
            (task) => task.status === 'created'
          );
          this.posts = createdTasks.filter(
            (task) => task.status === 'progress'
          );
          this.done = createdTasks.filter((task) => task.status === 'done');
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error('Error, ' + err.error.message, 'Error');
        }
      );

    //call api to get user details
    this.http
      .get(Utils.BASE_URL + 'user/' + userId, { headers: header })
      .subscribe((res) => {
        this.SignupUser = res;
      });
  }

  deleteItem(id: any) {
    this.loading = true;
    this.http.delete(Utils.BASE_URL + 'task/delete/' + id).subscribe(
      (res) => {
        this.loading = false;
        this.toastr.success('Task deleted Successfully!', 'Success');
        this.ngOnInit();
        this.router.navigate(['todo']);
      },
      (err: any) => {
        this.loading = false;
        console.log('Error: ', err);
        this.toastr.error('Task Delete Failed, ' + err.error.message, 'Error');
      }
    );
  }

  //update task status on move to new section
  updateTask(task: any, sectionId: String) {
    this.loading = true;
    //if section id is cdk-drop-list-0 then set task status to created,
    //if section id is cdk-drop-list-1 then set task status to progress,
    //if section id is cdk-drop-list-2 then set task status to done

    if (sectionId === 'cdk-drop-list-0') {
      task.status = 'created';
    } else if (sectionId === 'cdk-drop-list-1') {
      task.status = 'progress';
    } else if (sectionId === 'cdk-drop-list-2') {
      task.status = 'done';
    }

    //always format dates to backend standard of yyyy-mm-dd hh:mm:ss
    task.createdTime = Utils.formatDate(task.createdTime);
    task.dueDate = Utils.formatDate(task.dueDate);
    task.reminer = Utils.formatDate(task.reminderTime);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');
    this.http
      .put(Utils.BASE_URL + `task/update/${task.id}`, task, {
        headers: header,
      })
      .subscribe((res) => {
        this.loading = false;
        console.log('Updated Task: ', res);
        this.toastr.success('Task Updated Successfully!', 'Success');
        this.ngOnInit();
      }),
      (err: any) => {
        this.loading = false;
        this.toastr.error('Task Update Failed, ' + err.error.message, 'Error');
        console.log('Error: ', err);
      };
  }
  openModal(item: any) {
    if (item != null) {
      this.modalRef = this.modalService.open(ViewTaskComponent, {
        data: {
          taskId: item.id,
          title: item.title,
          description: item.description,
          dueDate: item.dueDate,
          status: item.status,
        },
      });
    }

    this.modalRef.onClose.subscribe((message: any) => {
      this.loading = true;
      this.ngOnInit();
    });
  }

  //takes item due date and returns true if date difference is less than or equal to 1
  //and status is not done
  taskOverdue(dueDate: any, status: any) {
    try {
      let date = new Date(dueDate);
      let today = new Date();
      let diff = Math.abs(date.getTime() - today.getTime());
      let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return diffDays <= 1 && status != 'done';
    } catch (error) {
      this.toastr.error('Something went wrong! ' + error.message, 'Error');
      return false;
    }
  }

  Logout() {
    //clear local storage then redirect to login page
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('Logged Out Successfully!', 'Success');
  }
}
