import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor() {}

  async getRecipes(filter: string = ''): Promise<Recipe[]> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    let query = supabaseService.supabase.from('recipes').select('*').order('created_at', { ascending: false });
    if (filter) {
      query = query.ilike('title', `%${filter}%`);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Recipe[];
  }

  async getRecipe(id: string): Promise<Recipe | null> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { data, error } = await supabaseService.supabase.from('recipes').select('*').match({ id }).single();
    if (error) return null;
    return data as Recipe;
  }

  async createRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>): Promise<Recipe> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { data, error } = await supabaseService.supabase.from('recipes').insert([recipe]).select('*').single();
    if (error) throw error;
    return data as Recipe;
  }

  async updateRecipe(id: string, recipe: Partial<Recipe>): Promise<Recipe> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { data, error } = await supabaseService.supabase.from('recipes').update(recipe).match({ id }).select('*').single();
    if (error) throw error;
    return data as Recipe;
  }

  async deleteRecipe(id: string): Promise<void> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { error } = await supabaseService.supabase.from('recipes').delete().match({ id });
    if (error) throw error;
  }
}
