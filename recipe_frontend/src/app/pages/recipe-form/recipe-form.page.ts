import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
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
export class RecipeFormPage {
  recipeId: string | null;
  recipe: Partial<Recipe> | null = null;
  errorMessage: string = '';

  constructor() {}

  async ngOnInit() {
    if (this.recipeId) {
      this.recipe = await this.recipeService.getRecipe(this.recipeId);
    }
  }

  async handleSave(recipe: Partial<Recipe>) {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      this.errorMessage = 'You must be logged in';
      return;
    }

    if (this.recipeId) {
      await this.recipeService.updateRecipe(this.recipeId, recipe);
      this.router.navigate(['/recipe', this.recipeId]);
    } else {
      await this.recipeService.createRecipe({ ...recipe, created_by: user.id } as any);
      this.router.navigate(['/']);
    }
  }

  goBack() {
    if (this.recipeId) {
      this.router.navigate(['/recipe', this.recipeId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
