import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: any;
  showProfileModal = false;
  showActivityModal = false;
  editName: string = '';
  activities = [
    { date: new Date(2025, 10, 16, 10, 30), action: 'Logged in to the system', icon: '🔐' },
    { date: new Date(2025, 10, 15, 14, 20), action: 'Updated profile information', icon: '✏️' },
    { date: new Date(2025, 10, 14, 9, 15), action: 'Changed password', icon: '🔑' },
    { date: new Date(2025, 10, 13, 16, 45), action: 'Logged in to the system', icon: '🔐' },
    { date: new Date(2025, 10, 12, 11, 0), action: 'Viewed dashboard', icon: '📊' }
  ];

  constructor(
    private auth: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.editName = this.user?.name || '';
  }

  openProfileModal() {
    this.editName = this.user?.name || '';
    this.showProfileModal = true;
  }

  closeProfileModal() {
    this.showProfileModal = false;
  }

  saveProfile() {
    if (this.editName.trim()) {
      this.user.name = this.editName.trim();
      localStorage.setItem('user', JSON.stringify(this.user));
      this.activities.unshift({
        date: new Date(),
        action: 'Updated profile name',
        icon: '✏️'
      });
      this.closeProfileModal();
      this.toastService.success('Profile updated successfully!');
    } else {
      this.toastService.warning('Please enter a valid name');
    }
  }

  openActivityModal() {
    this.showActivityModal = true;
  }

  closeActivityModal() {
    this.showActivityModal = false;
  }

  formatDate(date: Date): string {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
