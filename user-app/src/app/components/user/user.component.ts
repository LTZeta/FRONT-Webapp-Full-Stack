import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  title: string = "Listado de usuarios";
  users: User[] = []


  constructor(private router: Router, private service: UserService, private sharingDataService: SharingDataService) {
    if(this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe(users => this.users = users);
    }
  }

  ngOnInit(): void {

  }

  onRemoveUser(user: User): void {
    this.sharingDataService.userRemoveEmitter.emit(user);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id], {state: {user}});
  }

}
