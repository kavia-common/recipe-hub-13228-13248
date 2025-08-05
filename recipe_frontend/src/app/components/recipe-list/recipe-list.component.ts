/* global window */
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  query: string = '';
  favorites: string[] = [];
  userId: string | null = null;
  loading = false;

  constructor() {}

  async ngOnInit() {
    this.loading = true;
    const { RecipeService } = await import('../../services/recipe.service');
    const { FavoritesService } = await import('../../services/favorites.service');
    const { AuthService } = await import('../../services/auth.service');
    const recipeService = new RecipeService();
    const favoritesService = new FavoritesService();
    const authService = new AuthService();

    await this.fetchRecipes(recipeService);
    const user = await authService.getCurrentUser();
    this.userId = user?.id || null;
    if (this.userId) {
      this.favorites = await favoritesService.getFavorites(this.userId);
    }
    this.loading = false;
  }

  async fetchRecipes(recipeService?: any) {
    if (!recipeService) {
      const { RecipeService } = await import('../../services/recipe.service');
      recipeService = new RecipeService();
    }
    this.recipes = await recipeService.getRecipes(this.query);
  }

  async search() {
    await this.fetchRecipes();
  }

  isFavorite(recipeId: string): boolean {
    return this.favorites.includes(recipeId);
  }

  async toggleFavorite(recipeId: string) {
    if (!this.userId) return;
    const { FavoritesService } = await import('../../services/favorites.service');
    const favoritesService = new FavoritesService();
    if (this.isFavorite(recipeId)) {
      await favoritesService.removeFavorite(this.userId, recipeId);
      this.favorites = this.favorites.filter(id => id !== recipeId);
    } else {
      await favoritesService.addFavorite(this.userId, recipeId);
      this.favorites.push(recipeId);
    }
  }

  viewRecipe(recipe: Recipe) {
    if (typeof window !== 'undefined' && window.location) {
      window.location.pathname = `/recipe/${recipe.id}`;
    }
  }
}
