import { Component, computed, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component'; // Ensure UserComponent is imported
import { TasksComponent } from './tasks/tasks.component';
import { DUMMY_USERS } from './dummy-users'; // Import the DUMMY_USERS array

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TasksComponent], // Ensure UserComponent is included here
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'my-first-angular-app';
  users = DUMMY_USERS; // Use the imported DUMMY_USERS array
  selectedUserId = signal<string | undefined>(undefined); // Initialize selectedUserId with an empty string
  selectedUser = computed(()  => {
    const id = this.selectedUserId();
    return this.users.find((user) => user.id === id);
  });

  onUserSelected(id: string) {
    this.selectedUserId.set(id);
    console.log('Selected user ID:', id);
  }
}
