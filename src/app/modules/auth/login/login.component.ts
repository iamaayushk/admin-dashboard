import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  error: string = '';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid email or password';
      }
    });
  }
}
