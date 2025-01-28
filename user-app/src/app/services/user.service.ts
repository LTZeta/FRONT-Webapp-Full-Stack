import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'Leonel',
    lastname: 'Dadamia',
    email: 'leonel@mail.com',
    username: 'LTZ',
    password: '123456',
  },
  {
    id: 2,
    name: 'Flor',
    lastname: 'Montoya',
    email: 'flopy@mail.com',
    username: 'demonicEye',
    password: '123456',
  },
  {
    id: 3,
    name: 'pepito',
    lastname: 'gonzales',
    email: 'pepo@mail.com',
    username: 'pepo',
    password: '123456',
  }
];

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
