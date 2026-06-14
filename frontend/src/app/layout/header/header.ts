import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../core/services/theme.service';
 
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatMenuModule,MatIconModule],
  template: `
    <mat-toolbar class="header">
      <a class="logo" routerLink="/">MovieMate.</a>
      <a mat-button routerLink="/movies">Movies</a>
      <span class="spacer"></span>
      <button mat-icon-button (click)="theme.toggle()" aria-label="Toggle theme">
        <mat-icon>{{ theme.theme() === 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
      @if (auth.isLoggedIn()) {
        <button mat-button [matMenuTriggerFor]="menu">{{ auth.user()?.username }}</button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item routerLink="/dashboard">Dashboard</button>
          @if (auth.isAdmin()) { <button mat-menu-item routerLink="/admin">Admin</button> }
          <button mat-menu-item (click)="auth.logout()">Logout</button>
        </mat-menu>
      } @else {
        <a mat-raised-button routerLink="/login">Login</a>
      }
    </mat-toolbar>
  `,
  styles: `
    .header { position: sticky; top: 3px; z-index: 10; gap: 8px; }
    .logo { font-weight: 3rem; color: var(--mat-sys-primary); text-decoration: none; }
    .spacer { flex: 1; }
  `,
})
export class Header {
  auth = inject(AuthService);
   theme = inject(ThemeService);
}