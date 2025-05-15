import { Injectable, signal } from "@angular/core";
import { Task } from "./task/task.model";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
  // Initial dummy data
  private DUMMY_TASKS: Task[] = [
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
  ];

  // Use a signal to make tasks reactive
  private tasksSignal = signal<Task[]>(this.loadTasks());

  constructor() {
    // Try to load tasks from local storage in constructor
    console.log('TaskService initialized with', this.tasksSignal().length, 'tasks');
  }

  // Load tasks from localStorage with fallback to dummy data
  private loadTasks(): Task[] {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        console.log('Loaded tasks from localStorage:', parsedTasks.length);
        return parsedTasks;
      } else {
        console.log('No tasks found in localStorage, using dummy data');
        // Store dummy data in localStorage for next time
        localStorage.setItem('tasks', JSON.stringify(this.DUMMY_TASKS));
        return this.DUMMY_TASKS;
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return this.DUMMY_TASKS;
    }
  }

  // Save tasks to localStorage
  private saveTasks(tasks: Task[]) {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Saved', tasks.length, 'tasks to localStorage');
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }

  getUserTasks(userId: string) {
    return this.tasksSignal().filter((task) => task.userId === userId);
  }

  addTask(task: Task) {
    // Find highest existing ID
    const highestId = this.tasksSignal().reduce((maxId, currentTask) => {
      const currentIdNum = parseInt(currentTask.id.replace(/\D/g, ''), 10);
      return currentIdNum > maxId ? currentIdNum : maxId;
    }, 0);
    
    // Create new task with incremented ID
    const newTask: Task = {
      ...task,
      id: `t${highestId + 1}`,
    };
    
    console.log('New task created:', newTask);
    
    // Update tasks signal and save to localStorage
    this.tasksSignal.update(tasks => {
      const updatedTasks = [...tasks, newTask];
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  completeTask(taskId: string) {
    this.tasksSignal.update(tasks => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
    console.log('Task completed and removed:', taskId);
  }
  
  // Optional: Add method to reset to dummy data
  resetToDefaultTasks() {
    this.tasksSignal.set(this.DUMMY_TASKS);
    this.saveTasks(this.DUMMY_TASKS);
    console.log('Tasks reset to default dummy data');
  }
}
