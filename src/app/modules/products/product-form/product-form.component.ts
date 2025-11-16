import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {

  form!: FormGroup;

  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      const product = this.productService.getById(+id);
      if (product) {
        this.isEdit = true;
        this.form.patchValue(product);
      }
    }
  }

  submit() {
    const product = this.form.value as Product;

    if (this.isEdit) {
      this.productService.update(product);
    } else {
      this.productService.add(product);
    }

    this.router.navigate(['/products']);
  }
}
