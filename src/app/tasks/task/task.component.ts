import { Component, inject, input, output } from '@angular/core';
import type { Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-task',
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task = input.required<Task>();
  taskService = inject(TaskService);


  onComplete() {
    this.taskService.completeTask(this.task().id);
  }
}
