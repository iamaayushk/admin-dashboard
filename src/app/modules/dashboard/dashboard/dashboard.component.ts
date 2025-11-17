import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;

  user: any;
  lineChart: Chart | undefined;
  pieChart: Chart | undefined;
  barChart: Chart | undefined;

  stats = [
    { title: 'Total Users', value: 0 as number | string, color: 'primary', icon: '👥' },
    { title: 'Total Products', value: 0 as number | string, color: 'success', icon: '📦' },
    { title: 'Low Stock Items', value: 0 as number | string, color: 'warning', icon: '⚠️' },
    { title: 'Total Revenue (₹)', value: 0 as number | string, color: 'info', icon: '💰' }
  ];

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.loadStatistics();
  }

  loadStatistics() {
    const users = this.userService.getAll();
    const products = this.productService.getAll();
    const lowStockItems = products.filter(p => p.stock <= 10).length;
    const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

    this.stats = [
      { title: 'Total Users', value: users.length, color: 'primary', icon: '👥' },
      { title: 'Total Products', value: products.length, color: 'success', icon: '📦' },
      { title: 'Low Stock Items', value: lowStockItems, color: 'warning', icon: '⚠️' },
      { title: 'Total Revenue (₹)', value: Math.round(totalRevenue / 1000) + 'K', color: 'info', icon: '💰' }
    ];
  }

  ngAfterViewInit() {
    if (this.isAdmin()) {
      setTimeout(() => {
        this.createLineChart();
        this.createPieChart();
        this.createBarChart();
      }, 100);
    }
  }

  isAdmin() {
    return this.user?.role === 'admin';
  }

  createLineChart() {
    if (this.lineChartRef) {
      const isDark = document.body.classList.contains('dark-theme');
      const textColor = isDark ? '#cbd5e1' : '#1e293b';
      const gridColor = isDark ? '#334155' : '#e2e8f0';

      this.lineChart = new Chart(this.lineChartRef.nativeElement, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Sales',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            x: {
              ticks: { color: textColor },
              grid: { color: gridColor }
            },
            y: {
              beginAtZero: true,
              ticks: { color: textColor },
              grid: { color: gridColor }
            }
          }
        }
      });
    }
  }

  createPieChart() {
    if (this.pieChartRef) {
      const isDark = document.body.classList.contains('dark-theme');
      const textColor = isDark ? '#cbd5e1' : '#1e293b';

      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Electronics', 'Accessories', 'Clothing', 'Books'],
          datasets: [{
            data: [35, 25, 20, 20],
            backgroundColor: [
              '#3b82f6',
              '#10b981',
              '#f59e0b',
              '#ef4444'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: textColor
              }
            }
          }
        }
      });
    }
  }

  createBarChart() {
    if (this.barChartRef) {
      const isDark = document.body.classList.contains('dark-theme');
      const textColor = isDark ? '#cbd5e1' : '#1e293b';
      const gridColor = isDark ? '#334155' : '#e2e8f0';

      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Orders',
            data: [65, 78, 90, 81, 96, 105],
            backgroundColor: '#10b981'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              ticks: { color: textColor },
              grid: { color: gridColor }
            },
            y: {
              beginAtZero: true,
              ticks: { color: textColor },
              grid: { color: gridColor }
            }
          }
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.lineChart) this.lineChart.destroy();
    if (this.pieChart) this.pieChart.destroy();
    if (this.barChart) this.barChart.destroy();
  }
}
