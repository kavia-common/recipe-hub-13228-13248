import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  // PUBLIC_INTERFACE
  async signUp(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabaseService.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  // PUBLIC_INTERFACE
  async signIn(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  // PUBLIC_INTERFACE
  async signOut(): Promise<void> {
    const { error } = await this.supabaseService.supabase.auth.signOut();
    if (error) throw error;
  }

  // PUBLIC_INTERFACE
  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await this.supabaseService.supabase.auth.getUser();
    if (error || !data.user) return null;
    return {
      id: data.user.id,
      email: data.user.email || '',
    };
  }
}
