import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import type { User } from './user.model';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'], // Fixed property name
})
export class UserComponent {
  user = input.required<User>();
  selectSignal = output<string>();
  slected = input.required<boolean>();
  imageUrl = computed(() => {
    return `users/${this.user().avatar}`;
  })

  onSelectUser() {
    this.selectSignal.emit(this.user().id);
  }
}
