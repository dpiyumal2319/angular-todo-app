import { Injectable, signal } from "@angular/core";
import { Task } from "./task/task.model";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
  // Use a signal to make tasks reactive
  private tasksSignal = signal<Task[]>([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

  getUserTasks(userId: string) {
    return this.tasksSignal().filter((task) => task.userId === userId);
  }

  addTask(task: Task) {
    // Find highest existing ID
    const highestId = this.tasksSignal().reduce((maxId, currentTask) => {
      const currentIdNum = parseInt(currentTask.id.replace(/\D/g, ''), 10);
      console.log(`Parsing ID ${currentTask.id} to number: ${currentIdNum}`);
      return currentIdNum > maxId ? currentIdNum : maxId;
    }, 0);
    
    console.log(`Highest ID found: ${highestId}`);
    
    // Create new task with incremented ID
    const newTask: Task = {
      ...task,
      id: `t${highestId + 1}`,
    };
    
    console.log(`Generated new task ID: ${newTask.id}`);

    // Log the new task'
    console.log('New task created:', newTask);
    
    // Update tasks signal
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }

  completeTask(taskId: string) {
    this.tasksSignal.update(tasks => 
      tasks.filter(task => task.id !== taskId)
    );
    console.log('Task completed and removed:', taskId);
  } 
}
