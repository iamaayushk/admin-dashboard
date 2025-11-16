import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add', component: UserFormComponent },
  { path: 'edit/:id', component: UserFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserListComponent,
    UserFormComponent,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule {}
