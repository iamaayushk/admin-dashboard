import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';


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
        { id: 1, name: 'Admin User', email: 'admin@gmail.com', role: 'admin', status: 'active' },
        { id: 2, name: 'John Doe', email: 'john.doe@gmail.com', role: 'user', status: 'active' },
        { id: 3, name: 'Jane Smith', email: 'jane.smith@gmail.com', role: 'user', status: 'active' },
        { id: 4, name: 'Michael Johnson', email: 'michael.j@gmail.com', role: 'user', status: 'active' },
        { id: 5, name: 'Sarah Williams', email: 'sarah.w@gmail.com', role: 'admin', status: 'active' },
        { id: 6, name: 'David Brown', email: 'david.brown@gmail.com', role: 'user', status: 'inactive' },
        { id: 7, name: 'Emily Davis', email: 'emily.davis@gmail.com', role: 'user', status: 'active' },
        { id: 8, name: 'James Wilson', email: 'james.wilson@gmail.com', role: 'user', status: 'active' },
        { id: 9, name: 'Jessica Martinez', email: 'jessica.m@gmail.com', role: 'user', status: 'active' },
        { id: 10, name: 'Robert Taylor', email: 'robert.taylor@gmail.com', role: 'admin', status: 'active' },
        { id: 11, name: 'Linda Anderson', email: 'linda.anderson@gmail.com', role: 'user', status: 'active' },
        { id: 12, name: 'William Thomas', email: 'william.t@gmail.com', role: 'user', status: 'inactive' },
        { id: 13, name: 'Elizabeth Garcia', email: 'elizabeth.g@gmail.com', role: 'user', status: 'active' },
        { id: 14, name: 'Christopher Lee', email: 'chris.lee@gmail.com', role: 'user', status: 'active' },
        { id: 15, name: 'Patricia White', email: 'patricia.white@gmail.com', role: 'user', status: 'active' }
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
