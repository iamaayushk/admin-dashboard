import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  
  { path: 'auth/login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'dashboard', component: DashboardComponent },

      // Users (Module-based load)
      {
        path: 'users',
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
        loadChildren: () =>
          import('./modules/users/user.routes').then(m => m.USER_ROUTES)
      },

      // Products (ROUTES-based load)
      {
        path: 'products',
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
        loadChildren: () =>
          import('./modules/products/products.routes').then(m => m.PRODUCT_ROUTES)
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '' }
];
