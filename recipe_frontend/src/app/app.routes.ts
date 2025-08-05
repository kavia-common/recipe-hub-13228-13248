import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent)
  },
  {
    path: 'recipe/:id',
    loadComponent: () => import('./components/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/recipe-form/recipe-form.page').then(m => m.RecipeFormPage)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/recipe-form/recipe-form.page').then(m => m.RecipeFormPage)
  },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then(m => m.FavoritesPage)
  },
  { path: '**', redirectTo: '' }
];
