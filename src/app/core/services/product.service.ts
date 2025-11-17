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
        { id: 1, name: 'MacBook Pro 16"', category: 'Electronics', price: 199999, stock: 15, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
        { id: 2, name: 'Sony WH-1000XM5', category: 'Accessories', price: 29999, stock: 45, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
        { id: 3, name: 'Dell UltraSharp 27"', category: 'Electronics', price: 35000, stock: 28, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
        { id: 4, name: 'iPhone 15 Pro Max', category: 'Electronics', price: 159999, stock: 32, image: 'https://images.unsplash.com/photo-1592286927505-19d0c1c0d8d0?w=400' },
        { id: 5, name: 'iPad Air', category: 'Electronics', price: 59999, stock: 20, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400' },
        { id: 6, name: 'Logitech MX Master 3', category: 'Accessories', price: 8999, stock: 67, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
        { id: 7, name: 'Mechanical Keyboard RGB', category: 'Accessories', price: 12500, stock: 52, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
        { id: 8, name: 'Samsung Galaxy S24', category: 'Electronics', price: 89999, stock: 41, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
        { id: 9, name: 'AirPods Pro 2', category: 'Accessories', price: 24900, stock: 88, image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400' },
        { id: 10, name: 'Gaming Chair RGB', category: 'Furniture', price: 18999, stock: 15, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400' },
        { id: 11, name: 'Webcam 4K Pro', category: 'Accessories', price: 15999, stock: 34, image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400' },
        { id: 12, name: 'Portable SSD 2TB', category: 'Storage', price: 14999, stock: 72, image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400' },
        { id: 13, name: 'Smart Watch Ultra', category: 'Wearables', price: 45999, stock: 29, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400' },
        { id: 14, name: 'Wireless Charger', category: 'Accessories', price: 2999, stock: 95, image: 'https://images.unsplash.com/photo-1591290619762-d71b50c91cfd?w=400' },
        { id: 15, name: 'USB-C Hub 8-in-1', category: 'Accessories', price: 4999, stock: 63, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' },
        { id: 16, name: 'Graphics Tablet', category: 'Electronics', price: 32999, stock: 18, image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400' },
        { id: 17, name: 'Bluetooth Speaker', category: 'Audio', price: 8999, stock: 44, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
        { id: 18, name: 'Standing Desk', category: 'Furniture', price: 24999, stock: 12, image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400' }
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
