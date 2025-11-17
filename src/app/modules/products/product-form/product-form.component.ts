import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {

  form!: FormGroup;
  isEdit = false;
  imagePreview: string = '';
  uploadMethod: 'url' | 'file' = 'url';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      id: [null],
      image: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      const product = this.productService.getById(+id);
      if (product) {
        this.isEdit = true;
        this.form.patchValue(product);
        this.imagePreview = product.image || '';
      }
    }
    
    // Watch for image URL changes
    this.form.get('image')?.valueChanges.subscribe(value => {
      this.imagePreview = value || '';
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you would upload to a server
      // For demo, we'll use FileReader to create a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.form.patchValue({ image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.form.patchValue({ image: '' });
    this.imagePreview = '';
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control?.hasError('minLength')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 3 characters`;
    }
    if (control?.hasError('min')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be greater than or equal to 0`;
    }
    return '';
  }

  submit() {
    if (this.form.valid) {
      const product = this.form.value as Product;

      if (this.isEdit) {
        this.productService.update(product);
        this.toastService.success('Product updated successfully');
      } else {
        this.productService.add(product);
        this.toastService.success('Product created successfully');
      }

      this.router.navigate(['/products']);
    } else {
      this.toastService.error('Please fill all required fields correctly');
    }
  }
}
