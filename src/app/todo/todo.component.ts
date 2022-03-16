import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray,transferArrayItem  } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  url ='http://localhost:3000/created/'
  constructor(private http: HttpClient, private router:Router) { }
  created :any=[''];
  posts:any=[];
  done:any = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  ngOnInit(): void {
    console.log('ngOnInit')

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    //fetch userid from local storage
    let userId = localStorage.getItem('userId');

    //call api to get all tasks
    this.http.get('http://localhost:8080/api/task/'+userId, {headers: header})
    .subscribe(res=>{
      const createdTasks = Object.values(res);
      console.log("Tasks: ",createdTasks);

      //filter tasks
      this.created = createdTasks.filter(task=>task.status === 'created');
      this.posts = createdTasks.filter(task=>task.status === 'progress');
      this.done = createdTasks.filter(task=>task.status === 'done');
    }

    )
  }
deleteUser(id: any){
  // this.created.deleteUser(id).subscribe((result: any)=>{
  //   console.log(result);
  //   this.ngOnInit();
  // return this.http.delete(`${this.url}/${id}`);
 
  // });
  this.http.delete(`${this.url}/${id}`)
  .subscribe(res=>{
 alert("Task Deleted Successfully");
 this.ngOnInit();
 this.router.navigate(['todo']);
  },(err:any)=>{
    alert("Unable to delete task")
  })

} 
}