import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RecipeModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() initialRecipe: Partial<Recipe> | null = null;
  @Input() isEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Recipe>>();

  recipe: Partial<Recipe> = {};

  ngOnChanges() {
    this.recipe = { ...(this.initialRecipe ?? {}) };
    if (!this.recipe.nutrition) {
      this.recipe.nutrition = { calories: undefined, protein: undefined, fat: undefined, carbs: undefined };
    }
  }

  handleSave() {
    if (!this.recipe.title || !this.recipe.description) {
      throw new Error('Title and description are required.');
    }
    if (typeof this.recipe.ingredients === 'string') {
      this.recipe.ingredients = (this.recipe.ingredients as string).split('\n').map(x => x.trim()).filter(Boolean);
    }
    this.save.emit(this.recipe);
  }
}
