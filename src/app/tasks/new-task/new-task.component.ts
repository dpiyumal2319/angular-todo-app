import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<Task>();
  newTask = signal<Task>({
    id: '',
    title: '',
    summary: '',
    userId: '',
    dueDate: '',
  })

  onCancel() {
    this.cancel.emit();
  }
}
