import { Component, input, computed, signal } from '@angular/core';
import type { User } from '../user/user.model';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskService } from './tasks.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent],
})
export class TasksComponent {
  user = input.required<User>();
  addTask = signal(false);
  
  // Create a computed signal for the user's tasks
  userTasks = computed(() => {
    return this.taskService.getUserTasks(this.user().id);
  });

  constructor(private taskService: TaskService) {}

  onCompleteTask(taskId: string) {
    this.taskService.completeTask(taskId);
  }

  onStartAddTask() {
    this.addTask.set(true);
  }

  close() {
    this.addTask.set(false);
  }
}
