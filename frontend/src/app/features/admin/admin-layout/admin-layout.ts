import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin">
      <nav class="side">
        <a routerLink="genres" routerLinkActive="on">Genres</a>
        <a routerLink="auditoriums" routerLinkActive="on">Auditoriums</a>
        <a routerLink="movies" routerLinkActive="on">Movies</a>
        <a routerLink="showings" routerLinkActive="on">Showings</a>
      </nav>
      <section class="content"><router-outlet /></section>
    </div>
  `,
  styles: `
    .admin { display:flex; gap:24px; padding:24px; }
    .side { display:flex; flex-direction:column; gap:4px; min-width:160px; }
    .side a { padding:10px 14px; border-radius:8px; text-decoration:none; color:inherit; }
    .side a.on { background:var(--mat-sys-surface-container-high); color:var(--mat-sys-primary); }
    .content { flex:1; }
  `,
})
export class AdminLayout {}