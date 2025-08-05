/* global window */
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeModalComponent } from '../../components/recipe-modal/recipe-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-form-page',
  template: `
    <app-recipe-modal
      [isOpen]="true"
      [initialRecipe]="recipe"
      [isEdit]="!!recipeId"
      (close)="goBack()"
      (save)="handleSave($event)">
    </app-recipe-modal>
  `,
  standalone: true,
  imports: [RecipeModalComponent, CommonModule]
})
export class RecipeFormPage implements OnInit {
  recipeId: string | null = null;
  recipe: Partial<Recipe> | null = null;
  errorMessage: string = '';

  constructor() {}

  async ngOnInit() {
    const { ActivatedRoute } = await import('@angular/router');
    this.recipeId = ActivatedRoute.prototype.snapshot?.paramMap?.get?.('id') ?? null;
    const { RecipeService } = await import('../../services/recipe.service');
    const recipeService = new RecipeService();
    if (this.recipeId) {
      this.recipe = await recipeService.getRecipe(this.recipeId);
    }
  }

  async handleSave(recipe: Partial<Recipe>) {
    const { AuthService } = await import('../../services/auth.service');
    const { RecipeService } = await import('../../services/recipe.service');
    const authService = new AuthService();
    const recipeService = new RecipeService();

    const user = await authService.getCurrentUser();
    if (!user) {
      this.errorMessage = 'You must be logged in';
      return;
    }

    if (this.recipeId) {
      await recipeService.updateRecipe(this.recipeId, recipe);
      if (typeof window !== 'undefined' && window.location) {
        window.location.pathname = `/recipe/${this.recipeId}`;
      }
    } else {
      await recipeService.createRecipe({ ...recipe, created_by: user.id } as any);
      if (typeof window !== 'undefined' && window.location) {
        window.location.pathname = '/';
      }
    }
  }

  goBack() {
    if (typeof window !== 'undefined' && window.location) {
      if (this.recipeId) {
        window.location.pathname = `/recipe/${this.recipeId}`;
      } else {
        window.location.pathname = '/';
      }
    }
  }
}
