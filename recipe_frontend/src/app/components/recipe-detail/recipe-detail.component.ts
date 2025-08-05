import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  loading = true;
  isOwner = false;
  isFavorite = false;
  userId: string | null = null;

  constructor() {}

  async ngOnInit() {
    const recipeId = (await import('@angular/router')).ActivatedRoute.prototype.snapshot?.paramMap?.get?.('id') ?? null;
    if (!recipeId) { this.loading = false; return; }

    const { RecipeService } = await import('../../services/recipe.service');
    const { AuthService } = await import('../../services/auth.service');
    const { FavoritesService } = await import('../../services/favorites.service');
    const recipeService = new RecipeService();
    const authService = new AuthService();
    const favoritesService = new FavoritesService();

    this.recipe = await recipeService.getRecipe(recipeId);
    const user = await authService.getCurrentUser();
    this.userId = user?.id || null;
    this.isOwner = (this.userId && this.recipe?.created_by === this.userId) || false;
    if (this.userId && recipeId) {
      const favorites = await favoritesService.getFavorites(this.userId);
      this.isFavorite = favorites.includes(recipeId);
    }
    this.loading = false;
  }

  async deleteRecipe() {
    if (!this.recipe?.id) return;
    const { RecipeService } = await import('../../services/recipe.service');
    const recipeService = new RecipeService();
    await recipeService.deleteRecipe(this.recipe.id);
    if (typeof window !== 'undefined') {
      window.location.pathname = '/';
    }
  }

  async toggleFavorite() {
    if (!this.userId || !this.recipe?.id) return;
    const { FavoritesService } = await import('../../services/favorites.service');
    const favoritesService = new FavoritesService();
    if (this.isFavorite) {
      await favoritesService.removeFavorite(this.userId, this.recipe.id);
      this.isFavorite = false;
    } else {
      await favoritesService.addFavorite(this.userId, this.recipe.id);
      this.isFavorite = true;
    }
  }

  editRecipe() {
    if (typeof window !== 'undefined') {
      window.location.pathname = `/edit/${this.recipe?.id}`;
    }
  }
}
