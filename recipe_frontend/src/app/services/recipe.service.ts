import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Recipe } from '../models/recipe.model';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private supabaseService: SupabaseService) {}

  // PUBLIC_INTERFACE
  async getRecipes(filter: string = ''): Promise<Recipe[]> {
    let query = this.supabaseService.supabase.from('recipes').select('*').order('created_at', { ascending: false });
    if (filter) {
      query = query.ilike('title', `%${filter}%`);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Recipe[];
  }

  // PUBLIC_INTERFACE
  async getRecipe(id: string): Promise<Recipe | null> {
    const { data, error } = await this.supabaseService.supabase.from('recipes').select('*').match({ id }).single();
    if (error) throw error;
    return data as Recipe;
  }

  // PUBLIC_INTERFACE
  async createRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>): Promise<Recipe> {
    const { data, error } = await this.supabaseService.supabase.from('recipes').insert([recipe]).select('*').single();
    if (error) throw error;
    return data as Recipe;
  }

  // PUBLIC_INTERFACE
  async updateRecipe(id: string, recipe: Partial<Recipe>): Promise<Recipe> {
    const { data, error } = await this.supabaseService.supabase.from('recipes').update(recipe).match({ id }).select('*').single();
    if (error) throw error;
    return data as Recipe;
  }

  // PUBLIC_INTERFACE
  async deleteRecipe(id: string): Promise<void> {
    const { error } = await this.supabaseService.supabase.from('recipes').delete().match({ id });
    if (error) throw error;
  }
}
