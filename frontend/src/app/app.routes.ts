import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.Register) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'movies', loadComponent: () => import('./features/movies/movie-list/movie-list').then(m => m.MovieList) },
  { path: 'movies/:id', loadComponent: () => import('./features/movies/movie-detail/movie-detail').then(m => m.MovieDetail) },
  { path: 'showings/:id/book', canActivate: [authGuard], loadComponent: () => import('./features/booking/booking').then(m => m.Booking) },
  { path: 'admin', canActivate: [adminGuard],loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES) },
  { path: '**', loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound) },
];