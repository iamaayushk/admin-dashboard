import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const allowedRoles = route.data['roles']; // ['admin']
    const currentRole = this.auth.getRole();

    if (allowedRoles.includes(currentRole)) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
