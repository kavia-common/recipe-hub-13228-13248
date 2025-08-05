import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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
    await this.fetchRecipes();
    const user = await this.authService.getCurrentUser();
    this.userId = user?.id || null;
    if (this.userId) {
      this.favorites = await this.favoritesService.getFavorites(this.userId);
    }
    this.loading = false;
  }

  async fetchRecipes() {
    this.recipes = await this.recipeService.getRecipes(this.query);
  }

  async search() {
    await this.fetchRecipes();
  }

  isFavorite(recipeId: string): boolean {
    return this.favorites.includes(recipeId);
  }

  async toggleFavorite(recipeId: string) {
    if (!this.userId) return;
    if (this.isFavorite(recipeId)) {
      await this.favoritesService.removeFavorite(this.userId, recipeId);
      this.favorites = this.favorites.filter(id => id !== recipeId);
    } else {
      await this.favoritesService.addFavorite(this.userId, recipeId);
      this.favorites.push(recipeId);
    }
  }

  viewRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.id]);
  }
}
