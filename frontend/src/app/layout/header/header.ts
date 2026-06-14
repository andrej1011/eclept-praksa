import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../core/services/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
 
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatMenuModule,MatIconModule,MatSlideToggleModule],
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
          @if (auth.isAdmin()) {
            <div class="mode" (click)="$event.stopPropagation()">
              <mat-slide-toggle [checked]="userMode()" (change)="userMode.set($any($event).checked)">User mode</mat-slide-toggle>
            </div>
          }
          @if (!auth.isAdmin() || userMode()) {
            <button mat-menu-item routerLink="/dashboard">My Bookings</button>
            <a mat-menu-item routerLink="/profile">My Profile</a>
          } @else {
            <button mat-menu-item routerLink="/admin">Admin Panel</button>
            <button mat-menu-item routerLink="/admin/users">Edit Users</button>
          }
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
    .mode { padding: 8px 10px; }
    .mode mat-slide-toggle { transform: scale(0.8); transform-origin: left center; }
  `,
})
export class Header {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  userMode = signal(false);
}