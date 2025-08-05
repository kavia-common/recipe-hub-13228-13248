import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
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
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (!recipeId) { this.loading = false; return; }

    this.recipe = await this.recipeService.getRecipe(recipeId);
    const user = await this.authService.getCurrentUser();
    this.userId = user?.id || null;
    this.isOwner = (this.userId && this.recipe?.created_by === this.userId) || false;
    if (this.userId) {
      const favorites = await this.favoritesService.getFavorites(this.userId);
      this.isFavorite = favorites.includes(recipeId);
    }
    this.loading = false;
  }

  async deleteRecipe() {
    if (!this.recipe?.id) return;
    // No confirm popup; use a Boolean property for UI if needed
    await this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/']);
  }

  async toggleFavorite() {
    if (!this.userId || !this.recipe?.id) return;
    if (this.isFavorite) {
      await this.favoritesService.removeFavorite(this.userId, this.recipe.id);
      this.isFavorite = false;
    } else {
      await this.favoritesService.addFavorite(this.userId, this.recipe.id);
      this.isFavorite = true;
    }
  }

  editRecipe() {
    this.router.navigate(['/edit', this.recipe?.id]);
  }
}
