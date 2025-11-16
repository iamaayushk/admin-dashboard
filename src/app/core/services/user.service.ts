import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private key = 'users';

  constructor() {
    this.initialize();
  }

  private initialize() {
    const existing = this.getAll();

    if (!existing || existing.length === 0) {
      const defaultUsers: User[] = [
        {
          id: 1,
          name: 'Admin User',
          email: 'admin@gmail.com',
          role: 'admin',
          status: 'active'
        },
        {
          id: 2,
          name: 'Normal User',
          email: 'user@gmail.com',
          role: 'user',
          status: 'active'
        }
      ];

      this.saveAll(defaultUsers);
    }
  }

  getAll(): User[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveAll(users: User[]) {
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  add(user: User) {
    const users = this.getAll();
    user.id = Date.now();
    users.push(user);
    this.saveAll(users);
  }

  update(user: User) {
    const users = this.getAll();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = user;
      this.saveAll(users);
    }
  }

  delete(id: number) {
    const users = this.getAll().filter(u => u.id !== id);
    this.saveAll(users);
  }

  getById(id: number) {
    return this.getAll().find(u => u.id === id);
  }
}
