import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterModule]
})
export class AppComponent {
  user: User | null = null;

  constructor() {}

  // ngOnInit and signOut logic to be implemented via Angular lifecycle, not as class methods with unused injected services.
}
