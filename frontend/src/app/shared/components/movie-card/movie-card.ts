import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../core/models/movie';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  template: `
    <a class="card" [routerLink]="['/movies', movie().id]">
      <div class="poster">
        <img [src]="movie().poster_url || fallback" (error)="onErr($event)" [alt]="movie().name" />
      </div>
      <div class="meta">
        <h3>{{ movie().name }}</h3>
        <div class="genres">
          @for (g of movie().genres; track g.id) { <span class="chip">{{ g.name }}</span> }
        </div>
      </div>
    </a>
  `,
  styles: `
    .card { display:flex; flex-direction:column; text-decoration:none; color:inherit;
            border-radius:12px; overflow:hidden; background:var(--mat-sys-surface-container);
            transition:transform .2s, box-shadow .2s; }
    .card:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,.5); }
    .poster { position:relative; aspect-ratio:2/3; }
    .poster img { width:100%; height:100%; object-fit:cover; display:block; }
    .meta { padding:10px 12px; }
    .meta h3 { margin:0 0 6px; font-size:15px; }
    .genres { display:flex; flex-wrap:wrap; gap:4px; }
    .chip { font-size:11px; padding:2px 8px; border-radius:999px;
            background:var(--mat-sys-surface-container-high); color:var(--mat-sys-on-surface-variant); }
  `,
})
export class MovieCard {
  movie = input.required<Movie>();
  fallback = '/poster-fallback.png';
  onErr(e: Event) { (e.target as HTMLImageElement).src = this.fallback; }
}