import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:3000/created";
  constructor( private http:HttpClient) { }
profile(id: string){
  return this.http.get("http://localhost:3000/posts/"+ id).pipe(map((res)=>{
return res
}))
}
}