/* global window */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  isSignUp: boolean = false;
  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor() {}

  async handleAuth() {
    this.loading = true;
    this.error = '';
    try {
      const { AuthService } = await import('../../services/auth.service');
      const authService = new AuthService();
      if (this.isSignUp) {
        await authService.signUp(this.email, this.password);
        this.success = 'Sign up successful. Please check your email to confirm your account.';
        this.isSignUp = false;
        this.email = '';
        this.password = '';
      } else {
        await authService.signIn(this.email, this.password);
        if (typeof window !== 'undefined' && window.location) {
          window.location.pathname = '/';
        }
      }
    } catch (err: any) {
      this.error = err?.message || 'Authentication failed.';
    }
    this.loading = false;
  }

  switchMode() {
    this.isSignUp = !this.isSignUp;
    this.error = '';
    this.success = '';
    this.email = '';
    this.password = '';
  }
}
