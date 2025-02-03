import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})

export class UserAppComponent implements OnInit {
  users: User[] = [];


  constructor(private router: Router, private service: UserService, private sharingDataService: SharingDataService) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById(): void {
    this.sharingDataService.findUserByIdEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);
      this.sharingDataService.selectUserEmitter.emit(user);
    })
  }

  addUser(): void {
    this.sharingDataService.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.users = this.users.map(u => u.id == user.id ? { ...user } : u);
      } else {
        this.users = [...this.users, { ...user, id: new Date().getTime() }];
      }
      this.router.navigate(['/users'], { state: { users: this.users } });
      Swal.fire({
        title: "¡Genial!",
        text: "El usuario " + user.username + " se guardó con éxito",
        icon: "success"
      });
    });
  }

  removeUser(): void {
    this.sharingDataService.userRemoveEmitter.subscribe(userToRemove => {
      Swal.fire({
        title: "¿Estas seguro que deseas eliminar al usuario " + userToRemove.username + "?",
        text: "No podrás revertir la acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id != userToRemove.id);
          this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => this.router.navigate(['/users'], { state: { users: this.users } }));
          Swal.fire({
            title: "¡Genial!",
            text: "El usuario " + userToRemove.username + " se elimino con éxito",
            icon: "success"
          });
        }
      });
    });
  }

}
