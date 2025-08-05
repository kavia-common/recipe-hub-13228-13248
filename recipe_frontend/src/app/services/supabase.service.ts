import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    // Use injected environment values in Angular
    const url = (typeof process !== 'undefined' && process.env && process.env['NG_APP_SUPABASE_URL'])
      ? process.env['NG_APP_SUPABASE_URL']
      : (globalThis as any)['NG_APP_SUPABASE_URL'] || '';
    const key = (typeof process !== 'undefined' && process.env && process.env['NG_APP_SUPABASE_KEY'])
      ? process.env['NG_APP_SUPABASE_KEY']
      : (globalThis as any)['NG_APP_SUPABASE_KEY'] || '';
    this.supabase = createClient(url, key);
  }
}
