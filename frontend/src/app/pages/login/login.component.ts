import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../types/user.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';

  loginForm = this.formBuilder.nonNullable.group({
    userId: ['admin@example.com', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required]],
    role: ['Admin' as UserRole, [Validators.required]]
  });

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { userId, password, role } = this.loginForm.getRawValue();

    this.authService.login(userId, password, role).subscribe({
      next: (response) => {
        this.authService.saveLogin(response);
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed. Please check the details.';
        this.isLoading = false;
      }
    });
  }
}
