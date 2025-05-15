import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import type { User } from './user.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'], // Fixed property name
  standalone: false,
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
