import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  resultTasks: Task[] = [];
  myTask: Task = {
    label: '',
    completed: false
  }
  edit_task = false;
  showForm = false;
  searchText = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    this.taskService.findAll()
      .subscribe(tasks => {
        this.resultTasks = this.tasks = tasks;
      })
  }
  deleteTask(id: any) {
    this.taskService.delete(id)
      .subscribe(() => {
        this.resultTasks = this.tasks = this.tasks.filter(task => task.id != id)
      })
  }
  createTask() {
    this.taskService.create(this.myTask)
      .subscribe((task) => {
        this.resultTasks = this.tasks = [task, ...this.tasks];
        this.resetTask();
        this.showForm = false;
      })
  }
  resetTask() {
    this.myTask = {
      label: '',
      completed: false
    }
  }
  completedTask(task: Task) {
    this.taskService.taskCompleted(task.id,task.completed)
      .subscribe(() => {
        task.completed = !task.completed;
      })
  }
  editTask(task: Task) {
    this.showForm = true;
    if (this.edit_task == false) {
      this.myTask = task
      this.edit_task = true;
    }else {
      this.resetTask();
      this.edit_task = false;
    }
  }
  updateTask() {
    this.taskService.updateTasks(this.myTask)
      .subscribe(task => {
        this.resetTask();
        this.edit_task = false;
        this.showForm = false;
      })
  }
  searchTasks() {
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))
  }
}
