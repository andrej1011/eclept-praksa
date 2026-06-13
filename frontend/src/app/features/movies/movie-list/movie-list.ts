import { Component, computed, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieService } from '../../../core/services/movie.service';
import { GenreService } from '../../../core/services/genre.service';
import { Movie, MovieSortField, SortOrder } from '../../../core/models/movie';
import { Genre } from '../../../core/models/genre';
import { MovieCard } from '../../../shared/components/movie-card/movie-card';

@Component({
  selector: 'app-movie-list',
  imports: [MatFormFieldModule, MatSelectModule, MatPaginatorModule, MovieCard],
  template: `
    <div class="filters">
      <mat-form-field appearance="outline">
        <mat-label>Genre</mat-label>
        <mat-select [value]="genreId()" (selectionChange)="setGenre($event.value)">
          <mat-option [value]="null">All</mat-option>
          @for (g of genres(); track g.id) { <mat-option [value]="g.id">{{ g.name }}</mat-option> }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Sort by</mat-label>
        <mat-select [value]="sortBy()" (selectionChange)="setSort($event.value)">
          <mat-option value="name">Name</mat-option>
          <mat-option value="release_date">Release date</mat-option>
          <mat-option value="duration">Duration</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Order</mat-label>
        <mat-select [value]="order()" (selectionChange)="setOrder($event.value)">
          <mat-option value="asc">Ascending</mat-option>
          <mat-option value="desc">Descending</mat-option>
        </mat-select>
      </mat-form-field>
    </div>

    @if (loading()) { <p class="muted">Loading…</p> }
    @else if (movies().length === 0) { <p class="muted">No movies found.</p> }
    @else {
      <div class="grid">
        @for (m of paged(); track m.id) { <app-movie-card [movie]="m" /> }
      </div>
      <mat-paginator [length]="movies().length" [pageSize]="pageSize()"
        [pageSizeOptions]="[8,12,24]" [pageIndex]="pageIndex()" (page)="onPage($event)" />
    }
  `,
  styles: `
    .filters { display:flex; flex-wrap:wrap; gap:16px; padding:24px 24px 0; }
    .muted { padding:24px; color:var(--mat-sys-on-surface-variant); }
    .grid { display:grid; gap:20px; padding:16px 24px;
            grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); }
    mat-paginator { background:transparent; }
  `,
})
export class MovieList {
  private movieSvc = inject(MovieService);
  private genreSvc = inject(GenreService);

  genres = signal<Genre[]>([]);
  movies = signal<Movie[]>([]);
  loading = signal(true);

  genreId = signal<string | null>(null);
  sortBy = signal<MovieSortField>('name');
  order = signal<SortOrder>('asc');
  pageIndex = signal(0);
  pageSize = signal(12);

  paged = computed(() => {
    const s = this.pageIndex() * this.pageSize();
    return this.movies().slice(s, s + this.pageSize());
  });

  constructor() {
    this.genreSvc.list().then(g => this.genres.set(g));
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      this.movies.set(await this.movieSvc.list({
        genre_id: this.genreId() ?? undefined,
        sort_by: this.sortBy(),
        order: this.order(),
        limit: 100,
      }));
      this.pageIndex.set(0);
    } finally { this.loading.set(false); }
  }

  setGenre(v: string | null) { this.genreId.set(v); this.load(); }
  setSort(v: MovieSortField) { this.sortBy.set(v); this.load(); }
  setOrder(v: SortOrder) { this.order.set(v); this.load(); }
  onPage(e: PageEvent) { this.pageIndex.set(e.pageIndex); this.pageSize.set(e.pageSize); }
}