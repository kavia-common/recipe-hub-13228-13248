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
    let url = '';
    let key = '';
    if (typeof process !== 'undefined' && process.env) {
      url = process.env['NG_APP_SUPABASE_URL'] || '';
      key = process.env['NG_APP_SUPABASE_KEY'] || '';
    }
    if (!url || !key) {
      // fallback for global/window for browser
      url = (typeof globalThis !== 'undefined' && (globalThis as any)['NG_APP_SUPABASE_URL'])
        ? (globalThis as any)['NG_APP_SUPABASE_URL'] : '';
      key = (typeof globalThis !== 'undefined' && (globalThis as any)['NG_APP_SUPABASE_KEY'])
        ? (globalThis as any)['NG_APP_SUPABASE_KEY'] : '';
    }

    // Prevent server-side build from crashing; throw only in runtime, not at module load
    if (!url || !key) {
      if (typeof window !== 'undefined') {
        throw new Error('Supabase credentials (NG_APP_SUPABASE_URL, NG_APP_SUPABASE_KEY) are missing. Please set your environment variables.');
      }
      // For SSR/prerender, use a mock/fake client to avoid breaking prerender
      this.supabase = {
        from: () => ({
          select: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
          insert: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
          update: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
          delete: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
          eq: () => ({
            select: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
            delete: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
          }),
          ilike: () => ({
            select: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
          }),
          match: () => ({
            select: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
            update: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
            delete: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
          }),
          order: () => ({
            select: () => Promise.resolve({ data: [], error: 'Supabase URL not set (SSR mock).' }),
          }),
        }),
        auth: {
          signUp: () => Promise.resolve({ data: null, error: 'Supabase URL not set (SSR mock).' }),
          signInWithPassword: () => Promise.resolve({ data: null, error: 'Supabase URL not set (SSR mock).' }),
          signOut: () => Promise.resolve({ error: 'Supabase URL not set (SSR mock).' }),
          getUser: () => Promise.resolve({ data: { user: null }, error: 'Supabase URL not set (SSR mock).' }),
        }
      } as any;
      return;
    }

    this.supabase = createClient(url, key);
  }
}
