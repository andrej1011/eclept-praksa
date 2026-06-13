import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatMenuModule],
  template: `
    <mat-toolbar class="header">
      <a class="logo" routerLink="/">MovieMate</a>
      <a mat-button routerLink="/movies">Movies</a>
      <span class="spacer"></span>
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
    .header { position: sticky; top: 0; z-index: 10; gap: 8px; }
    .logo { font-weight: 700; color: var(--mat-sys-primary); text-decoration: none; }
    .spacer { flex: 1; }
  `,
})
export class Header {
  auth = inject(AuthService);
}