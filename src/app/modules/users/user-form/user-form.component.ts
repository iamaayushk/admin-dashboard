import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  form = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required],
    status: ['active', Validators.required]
  });

  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    const user = this.form.value as User;

    if (this.isEdit) {
      this.userService.update(user);
    } else {
      this.userService.add(user);
    }

    this.router.navigate(['/users']);
  }
}
