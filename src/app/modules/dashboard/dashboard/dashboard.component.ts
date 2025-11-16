import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  stats = [
    { title: 'Total Users', value: 120, color: 'primary' },
    { title: 'Active Orders', value: 45, color: 'success' },
    { title: 'Pending Tickets', value: 8, color: 'warning' },
    { title: 'Revenue (₹)', value: 53000, color: 'info' }
  ];
}
