import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout/admin-layout';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminLayout, children: [
    { path: '', redirectTo: 'genres', pathMatch: 'full' },
    { path: 'genres', loadComponent: () => import('./genres-admin/genres-admin').then(m => m.GenresAdmin) },
    { path: 'auditoriums', loadComponent: () => import('./auditoriums-admin/auditoriums-admin').then(m => m.AuditoriumsAdmin) },
    { path: 'movies', loadComponent: () => import('./movies-admin/movies-admin').then(m => m.MoviesAdmin) },
  ]},
];