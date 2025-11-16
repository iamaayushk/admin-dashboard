import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { PRODUCT_ROUTES } from './products.routes';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(PRODUCT_ROUTES)]
})
export class ProductsModule {}
@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductsModule {}
