import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private supabaseService: SupabaseService) {}

  // PUBLIC_INTERFACE
  async getFavorites(userId: string): Promise<string[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('favorites')
      .select('recipe_id')
      .eq('user_id', userId);
    if (error) throw error;
    return (data as any[]).map((item) => item.recipe_id);
  }

  // PUBLIC_INTERFACE
  async addFavorite(userId: string, recipeId: string): Promise<void> {
    const { error } = await this.supabaseService.supabase
      .from('favorites')
      .insert([{ user_id: userId, recipe_id: recipeId }]);
    if (error) throw error;
  }

  // PUBLIC_INTERFACE
  async removeFavorite(userId: string, recipeId: string): Promise<void> {
    const { error } = await this.supabaseService.supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);
    if (error) throw error;
  }
}
