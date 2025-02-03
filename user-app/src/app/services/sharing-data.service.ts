import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  private _userRemoveEmitter: EventEmitter<User> = new EventEmitter();
  private _findUserByIdEmitter: EventEmitter<number> = new EventEmitter();
  private _selectUserEmitter: EventEmitter<User> = new EventEmitter();

  constructor() { }

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  get userRemoveEmitter(): EventEmitter<User> {
    return this._userRemoveEmitter;
  }

  get findUserByIdEmitter(): EventEmitter<number> {
    return this._findUserByIdEmitter;
  }

  get selectUserEmitter(): EventEmitter<User> {
    return this._selectUserEmitter;
  }

}
