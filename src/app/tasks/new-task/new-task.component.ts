import { Component, EventEmitter, input, Output, inject } from '@angular/core';
import { Task } from '../task/task.model';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() close = new EventEmitter<void>();
  
  // Change to regular input without required
  userId = input<string>('');
  
  // Initialize with a default empty task
  newTask: Task = {
    id: '',
    title: '',
    summary: '',
    userId: '',
    dueDate: '',
  }

  private taskService = inject(TaskService);

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.newTask.title && this.newTask.summary && this.newTask.dueDate) {
      // Create a new task with the current userId
      const newTask: Task = {
        ...this.newTask,
        userId: this.userId() // Get the current userId from the input
      };
      
      console.log('Adding task for userId:', this.userId());
      this.taskService.addTask(newTask);
      this.close.emit();
      this.newTask = { id: '', title: '', summary: '', userId: '', dueDate: '' };
    } else {
      console.log('Form validation failed:', this.newTask);
    }
  }
}
