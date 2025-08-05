import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  template: `
    <div class="fav-title">My Favorites</div>
    <div class="fav-grid">
      <div class="card" *ngFor="let recipe of favoriteRecipes" (click)="viewRecipe(recipe)">
        <img *ngIf="recipe.imageUrl" [src]="recipe.imageUrl" alt="{{recipe.title}}" />
        <div class="card-content">
          <h3>{{ recipe.title }}</h3>
          <p>{{ recipe.description | slice:0:80 }}{{ recipe.description.length > 80 ? '...' : '' }}</p>
        </div>
      </div>
    </div>
    <div *ngIf="!favoriteRecipes.length">No favorite recipes yet.</div>
  `,
  styles: [`
    .fav-title {
      font-size: 2rem;
      color: #ff9800;
      margin: 22px 0 22px 13px;
      font-weight: 700;
    }
    .fav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 22px;
      margin: 0 22px 22px 22px;
    }
    .card {
      background: #fffbea;
      border-radius: 18px;
      box-shadow: 0 2px 8px 0 rgba(76, 175, 80, 0.15);
      cursor: pointer;
      padding-bottom: 8px;
      overflow: hidden;
      transition: box-shadow 0.14s;
      display: flex;
      flex-direction: column;
    }
    .card img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
    }
    .card-content {
      padding: 16px 12px;
      flex: 1;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class FavoritesPage implements OnInit {
  favoriteRecipes: Recipe[] = [];

  constructor() {}
}
