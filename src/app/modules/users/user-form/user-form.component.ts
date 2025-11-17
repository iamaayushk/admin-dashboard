import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  form!: FormGroup;

  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required],
      status: ['active', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      const user = this.userService.getById(+id);
      if (user) {
        this.isEdit = true;
        this.form.patchValue(user);
      }
    }
  }

  submit() {
    if (this.form.valid) {
      const user = this.form.value as User;

      if (this.isEdit) {
        this.userService.update(user);
        this.toastService.success('User updated successfully');
      } else {
        this.userService.add(user);
        this.toastService.success('User created successfully');
      }

      this.router.navigate(['/users']);
    } else {
      this.toastService.error('Please fill all required fields');
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
