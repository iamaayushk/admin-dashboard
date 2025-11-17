import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  
  searchTerm: string = '';
  categoryFilter: string = 'all';
  stockFilter: string = 'all';
  sortBy: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  viewMode: 'grid' | 'list' = 'grid';
  
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  
  categories: string[] = [];
  showDeleteModal: boolean = false;
  productToDelete: Product | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.products = this.productService.getAll();
    this.extractCategories();
    this.applyFilters();
  }

  extractCategories() {
    const uniqueCategories = new Set(this.products.map(p => p.category));
    this.categories = Array.from(uniqueCategories).sort();
  }

  applyFilters() {
    let result = [...this.products];

    // Search filter
    if (this.searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (this.categoryFilter !== 'all') {
      result = result.filter(p => p.category === this.categoryFilter);
    }

    // Stock filter
    if (this.stockFilter === 'instock') {
      result = result.filter(p => p.stock > 0);
    } else if (this.stockFilter === 'outofstock') {
      result = result.filter(p => p.stock === 0);
    } else if (this.stockFilter === 'lowstock') {
      result = result.filter(p => p.stock > 0 && p.stock <= 10);
    }

    // Sort
    result.sort((a, b) => {
      let aVal: any = a[this.sortBy as keyof Product];
      let bVal: any = b[this.sortBy as keyof Product];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredProducts = result;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  toggleSort(column: string) {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
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

  addProduct() {
    this.router.navigate(['/products/add']);
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      this.productToDelete = product;
      this.showDeleteModal = true;
    }
  }

  confirmDelete() {
    if (this.productToDelete) {
      try {
        const productName = this.productToDelete.name;
        this.productService.delete(this.productToDelete.id);
        this.products = this.productService.getAll();
        this.extractCategories();
        this.applyFilters();
        this.toastService.success(`Product "${productName}" deleted successfully!`);
        this.cancelDelete();
      } catch (error) {
        this.toastService.error('Failed to delete product. Please try again.');
        console.error('Error deleting product:', error);
      }
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }
}
