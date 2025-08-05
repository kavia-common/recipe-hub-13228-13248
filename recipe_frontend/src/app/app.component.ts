import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  user: User | null = null;

  constructor() {}

  async ngOnInit() {
    const { AuthService } = await import('./services/auth.service');
    const authService = new AuthService();
    this.user = await authService.getCurrentUser();
  }

  async signOut() {
    const { AuthService } = await import('./services/auth.service');
    const authService = new AuthService();
    await authService.signOut();
    this.user = null;
    if (typeof location !== 'undefined') {
      location.pathname = '/';
    }
  }
}
