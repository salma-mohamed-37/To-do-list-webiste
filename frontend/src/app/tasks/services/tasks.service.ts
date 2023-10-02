import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url : string ="https://localhost:7179/api/tasks/"
  constructor(private http : HttpClient) { }

  getTasks(filter:string):Observable<Task[]>
  {
    return this.http.get<Task[]>(this.url+filter);
  }

  addTask(task:Task)
  {
    return this.http.post(this.url,task);
  }
}
