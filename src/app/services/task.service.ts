import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = "http://localhost:8000/get-list/";
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Task[]>(this.apiUrl);
  }
  delete(id: Number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
  create(task: Task) {
    return this.http.post<Task>(this.apiUrl,task);
  }
  taskCompleted(id: Number | undefined,completed: Boolean) {
    return this.http.patch(`${this.apiUrl}${id}/`,{completed: !completed})
  }
  updateTasks(task: Task) {
    return this.http.put(`${this.apiUrl}${task.id}/`,task);
  }
}
