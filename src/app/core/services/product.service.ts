import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private key = 'products';

  constructor() {
    this.initialize();
  }

  private initialize() {
    const existing = this.getAll();

    if (!existing || existing.length === 0) {
      const sampleProducts: Product[] = [
        { id: 1, name: 'Laptop', category: 'Electronics', price: 55000, stock: 10 },
        { id: 2, name: 'Headphones', category: 'Accessories', price: 2500, stock: 50 },
        { id: 3, name: 'LED Monitor', category: 'Electronics', price: 12000, stock: 20 }
      ];

      this.saveAll(sampleProducts);
    }
  }

  getAll(): Product[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveAll(products: Product[]) {
    localStorage.setItem(this.key, JSON.stringify(products));
  }

  add(product: Product) {
    const products = this.getAll();
    product.id = Date.now();
    products.push(product);
    this.saveAll(products);
  }

  update(product: Product) {
    const products = this.getAll();
    const idx = products.findIndex(p => p.id === product.id);
    if (idx !== -1) {
      products[idx] = product;
      this.saveAll(products);
    }
  }

  delete(id: number) {
    const products = this.getAll().filter(p => p.id !== id);
    this.saveAll(products);
  }

  getById(id: number) {
    return this.getAll().find(p => p.id === id);
  }
}
