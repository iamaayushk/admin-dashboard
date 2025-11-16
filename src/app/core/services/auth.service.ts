import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Dummy backend users
  private users = [
    { email: 'admin@gmail.com', password: '123456', role: 'admin', name:'Admin User' },
    { email: 'user@gmail.com', password: '123456', role: 'user', name:'Normal User' }
  ];

  private currentUserSubject = new BehaviorSubject<any>(this.getUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string) {
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(true);
    }

    return of(false);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }
}
