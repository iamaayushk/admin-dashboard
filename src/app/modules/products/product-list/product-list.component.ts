import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.products = this.productService.getAll();
  }

  addProduct() {
    this.router.navigate(['/products/add']);
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productService.delete(id);
      this.products = this.productService.getAll(); // refresh
    }
  }
}
