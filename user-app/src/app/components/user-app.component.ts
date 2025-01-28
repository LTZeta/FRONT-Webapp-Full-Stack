import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from "./user-form/user-form.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
})

export class UserAppComponent implements OnInit {
  title: string = "Listado de usuarios";
  users: User[] = [];
  userSelected: User;
  isOpen: boolean = false;


  constructor(private service: UserService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: User): void {
    if (user.id > 0) {
      this.users = this.users.map(u => u.id == user.id ? { ...user } : u);
    } else {
      this.users = [...this.users, { ...user, id: new Date().getTime() }];
    }
    Swal.fire({
      title: "¡Genial!",
      text: "El usuario "+ user.username +" se guardó con éxito",
      icon: "success"
    });
    this.userSelected = new User();
    this.isOpen = false;
  }

  removeUser(userToRemove: User): void {
    Swal.fire({
      title: "¿Estas seguro que deseas eliminar al usuario "+ userToRemove.username +"?",
      text: "No podrás revertir la acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(user => user.id != userToRemove.id);
        this.isOpen = false;
        Swal.fire({
          title: "¡Genial!",
          text: "El usuario "+ userToRemove.username +" se elimino con éxito",
          icon: "success"
        });
      }
    });
    
  }

  selectedUser(userRow: User): void {
    this.userSelected = { ...userRow };
    this.isOpen = true;
  }

  setIsOpen(): void {
    this.isOpen = !this.isOpen;
  }

} 
