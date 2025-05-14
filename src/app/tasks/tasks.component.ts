import { Component, input, computed, signal } from '@angular/core';
import type { User } from '../user/user.model';
import { TaskComponent } from './task/task.component';
import { DUMMY_TASKS } from './dummy-tasks';
import { Task } from './task/task.model';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent],
})
export class TasksComponent {
  // Also modify this to fix the original NG0950 error
  user = input.required<User>();
  tasks = signal(DUMMY_TASKS);
  addTask = signal(false);

  selectedUserTasks = computed(() => {
    return this.tasks().filter((task) => task.userId === this.user().id);
  });

  completeTask(taskId: string) {
    console.log('Task completed:', taskId);
    this.tasks.update((tasks) => {
      return tasks.filter((task) => task.id !== taskId);
    });
  }

  onStartAddTask() {
    this.addTask.set(true);
  }

  onCancelAddTask() {
    this.addTask.set(false);
  }

  onAddTask(task: Task) {
    this.tasks.update((tasks) => {
      return [...tasks, task];
    });
    this.addTask.set(false);
  }
}
