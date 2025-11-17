import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  
  searchTerm: string = '';
  roleFilter: string = 'all';
  statusFilter: string = 'all';
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  
  showDeleteModal: boolean = false;
  userToDelete: User | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.users = this.userService.getAll();
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.users];

    // Search filter
    if (this.searchTerm) {
      result = result.filter(u => 
        u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (this.roleFilter !== 'all') {
      result = result.filter(u => u.role === this.roleFilter);
    }

    // Status filter
    if (this.statusFilter !== 'all') {
      result = result.filter(u => u.status === this.statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[this.sortColumn as keyof User];
      let bVal = b[this.sortColumn as keyof User];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredUsers = result;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  deleteUser(id: number) {
    const user = this.users.find(u => u.id === id);
    if (user) {
      this.userToDelete = user;
      this.showDeleteModal = true;
    }
  }

  confirmDelete() {
    if (this.userToDelete) {
      try {
        const userName = this.userToDelete.name;
        this.userService.delete(this.userToDelete.id);
        this.users = this.userService.getAll();
        this.applyFilters();
        this.toastService.success(`User "${userName}" deleted successfully!`);
        this.cancelDelete();
      } catch (error) {
        this.toastService.error('Failed to delete user. Please try again.');
        console.error('Error deleting user:', error);
      }
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  editUser(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }
}
