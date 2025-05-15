import { Component, inject, input, output } from '@angular/core';
import type { Task } from './task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone:false
})
export class TaskComponent {
  task = input.required<Task>();
  taskService = inject(TaskService);


  onComplete() {
    this.taskService.completeTask(this.task().id);
  }
}
