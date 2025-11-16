import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.users = this.userService.getAll();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id);
      this.users = this.userService.getAll();
    }
  }

  editUser(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }
}
