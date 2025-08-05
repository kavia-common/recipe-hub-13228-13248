import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
}
