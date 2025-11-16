import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
