import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor() {}

  async getFavorites(userId: string): Promise<string[]> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { data, error } = await supabaseService.supabase
      .from('favorites')
      .select('recipe_id')
      .eq('user_id', userId);
    if (error) throw error;
    return (data as any[]).map((item) => item.recipe_id);
  }

  async addFavorite(userId: string, recipeId: string): Promise<void> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { error } = await supabaseService.supabase
      .from('favorites')
      .insert([{ user_id: userId, recipe_id: recipeId }]);
    if (error) throw error;
  }

  async removeFavorite(userId: string, recipeId: string): Promise<void> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { error } = await supabaseService.supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);
    if (error) throw error;
  }
}
