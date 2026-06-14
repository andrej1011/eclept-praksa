import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie';
import { MovieCard } from '../../shared/components/movie-card/movie-card';

@Component({
  selector: 'app-home',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MovieCard],
  template: `
    <section class="hero-search">
      <mat-form-field appearance="outline" class="search">
        <mat-icon matPrefix>search</mat-icon>
        <input matInput placeholder="Search movies" [(ngModel)]="query" (ngModelChange)="onSearch($event)" />
      </mat-form-field>
    </section>

    <h1 class="title">Now Showing</h1>

    @if (loading()) { <p class="muted">Loading…</p> }
    @else if (movies().length === 0) { <p class="muted">No movies found.</p> }
    @else {
      <div class="grid">
        @for (m of movies(); track m.id) { <app-movie-card [movie]="m" /> }
      </div>
    }
  `,
  styles: `
    .hero-search { display:flex; justify-content:center; padding:32px 16px 8px; }
    .search { width:100%; max-width:520px; }
    .title { padding:0 24px; }
    .muted { padding:24px; color:var(--mat-sys-on-surface-variant); }
    .grid { display:grid; gap:20px; padding:16px 24px 48px;
            grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); }
  `,
})
export class Home {
  private movieSvc = inject(MovieService);
  movies = signal<Movie[]>([]);
  loading = signal(true);
  query = '';
  private t?: ReturnType<typeof setTimeout>;

  constructor() { this.load(); }

  async load(name?: string) {
    this.loading.set(true);
    try { this.movies.set(await this.movieSvc.list({ name, limit: 100 })); }
    finally { this.loading.set(false); }
  }

  onSearch(q: string) {
    clearTimeout(this.t);
    this.t = setTimeout(() => this.load(q.trim() || undefined), 300);  // debounce
  }
}