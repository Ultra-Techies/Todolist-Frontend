import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray,transferArrayItem  } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
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
  // \\created = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // \\created = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // inprogress: any={
  //   task:"",
  //   duedate:"",
  // }
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
    this.http.get('http://localhost:3000/created')
    // this.http.get('http://localhost:3000/posts')
    .subscribe(res=>{
      this.created = res
      this.created.reset
      console.log(this.created)
      // this.posts =res
      // console.log(this.posts)
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