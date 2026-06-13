import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../../core/services/movie.service';
import { AuditoriumService } from '../../../core/services/auditorium.service';
import { Movie } from '../../../core/models/movie';
import { Showing } from '../../../core/models/showing';
import { Auditorium } from '../../../core/models/auditorium';

interface DayGroup { date: string; showings: Showing[]; }

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink, DatePipe, MatButtonModule],
  template: `
    @if (loading()) { <p class="muted">Loading…</p> }
    @else if (movie(); as m) {
      <div class="detail">
        <img class="poster" [src]="m.poster_url || fallback" (error)="onErr($event)" [alt]="m.name" />
        <div class="info">
          <h1>{{ m.name }}</h1>
          <div class="genres">
            @for (g of m.genres; track g.id) { <span class="chip">{{ g.name }}</span> }
          </div>
          <p class="meta">
            @if (m.release_date) {Release date: {{ m.release_date | date:'d. MMMM y.' }} }
          </p>
          <p class="meta">
            Duration: {{ (m.duration - (m.duration % 60)) / 60 }}h {{ m.duration % 60 }}m
          </p>
          @if (m.short_description) { <p class="desc">{{ m.short_description }}</p> }
          @if (m.imdb_link) {
            <a [href]="m.imdb_link" target="_blank" rel="noopener" mat-stroked-button>IMDb</a>
          }

          <h2>Showings</h2>
          @if (days().length === 0) { <p class="muted">No upcoming showings.</p> }
          @for (d of days(); track d.date) {
            <div class="day">
              <h3>{{ d.date | date:'EEEE, d. MMMM' }}</h3>
              <div class="chips">
                @for (s of d.showings; track s.id) {
                  <a mat-flat-button class="chip-btn" [class.sold]="soldOut(s)"
                     [routerLink]="soldOut(s) ? null : ['/showings', s.id, 'book']">
                    {{ s.start_time | date:'HH:mm' }} · {{ audName(s.auditorium_id) }}@if (soldOut(s)) { · Full }
                  </a>
                }
              </div>
            </div>
          }
        </div>
      </div>
    } @else { <p class="muted">Movie not found.</p> }
  `,
  styles: `
    .muted { padding:24px; color:var(--mat-sys-on-surface-variant); }
    .detail { display:flex; flex-wrap:wrap; gap:32px; align-items:flex-start; padding:32px 24px; }
    .poster { width:33vw; max-width:420px; aspect-ratio:2/3; object-fit:cover; border-radius:12px; }
    .info { flex:1; min-width:280px; }
    .genres { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px; }
    .chip { font-size:12px; padding:2px 10px; border-radius:999px;
            background:var(--mat-sys-surface-container-high); color:var(--mat-sys-on-surface-variant); }
    .meta { color:var(--mat-sys-on-surface-variant); }
    .desc { max-width:60ch; line-height:1.6; }
    .day { margin-top:16px; }
    .day h3 { margin:0 0 8px; font-size:14px; color:var(--mat-sys-on-surface-variant); }
    .chips { display:flex; flex-wrap:wrap; gap:8px; }
    .chip-btn.sold { opacity:.45; pointer-events:none; }
    @media (max-width:700px){ .detail { grid-template-columns:1fr; } }
  `,
})
export class MovieDetail {
  private route = inject(ActivatedRoute);
  private movieSvc = inject(MovieService);
  private audSvc = inject(AuditoriumService);

  movie = signal<Movie | null>(null);
  loading = signal(true);
  private auds = signal<Map<string, Auditorium>>(new Map());
  fallback = '/poster-fallback.png';

  days = computed<DayGroup[]>(() => {
    const m = this.movie();
    if (!m) return [];
    const now = Date.now();
    const future = m.showings
      .filter(s => s.status === 'active' && new Date(s.start_time).getTime() >= now)
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
    const map = new Map<string, Showing[]>();
    for (const s of future) {
      const day = s.start_time.slice(0, 10);
      const arr = map.get(day);
      if (arr) arr.push(s); else map.set(day, [s]);
    }
    return [...map.entries()].map(([date, showings]) => ({ date, showings }));
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    Promise.all([this.movieSvc.get(id), this.audSvc.list()])
      .then(([mv, a]) => { this.movie.set(mv); this.auds.set(new Map(a.map(x => [x.id, x]))); })
      .finally(() => this.loading.set(false));
  }

  audName(id: string) { return this.auds().get(id)?.name ?? ''; }
  soldOut(s: Showing) {
    const cap = this.auds().get(s.auditorium_id)?.capacity;
    return cap != null && s.booked_seats >= cap;
  }
  onErr(e: Event) { (e.target as HTMLImageElement).src = this.fallback; }
}