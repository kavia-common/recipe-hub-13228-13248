import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  async signUp(email: string, password: string): Promise<any> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { data, error } = await supabaseService.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string): Promise<any> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { data, error } = await supabaseService.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut(): Promise<void> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { error } = await supabaseService.supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser(): Promise<User | null> {
    const { SupabaseService } = await import('./supabase.service');
    const supabaseService = new SupabaseService();
    const { data, error } = await supabaseService.supabase.auth.getUser();
    if (error || !data.user) return null;
    return {
      id: data.user.id,
      email: data.user.email || '',
    };
  }
}
