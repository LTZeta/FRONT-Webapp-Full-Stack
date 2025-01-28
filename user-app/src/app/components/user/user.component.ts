import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  @Input() users: User[] = []

  @Output() userRemoveEmitter: EventEmitter<User> = new EventEmitter();
  @Output() userSelectedEmitter: EventEmitter<User> = new EventEmitter();

  ngOnInit(): void {

  }

  onRemoveUser(user: User): void {
    this.userRemoveEmitter.emit(user);
  }

  onSelectedUser(user: User): void {
    this.userSelectedEmitter.emit(user);
  }

}
