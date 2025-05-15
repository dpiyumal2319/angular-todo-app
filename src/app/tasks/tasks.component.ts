import { Component, input, computed, signal } from '@angular/core';
import type { User } from '../user/user.model';
import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  standalone: false,
})
export class TasksComponent {
  user = input.required<User>();
  addTask = signal(false);
  
  // Create a computed signal for the user's tasks
  userTasks = computed(() => {
    return this.taskService.getUserTasks(this.user().id);
  });

  constructor(private taskService: TaskService) {}

  onStartAddTask() {
    this.addTask.set(true);
  }

  close() {
    this.addTask.set(false);
  }
}
