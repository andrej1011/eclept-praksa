import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService, MovieInput } from '../../../core/services/movie.service';
import { Movie } from '../../../core/models/movie';
import { apiError } from '../../../core/utils/api-error';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { MovieFormDialog } from './movie-form-dialog/movie-form-dialog';

@Component({
  selector: 'app-movies-admin',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="head">
      <h2>Movies</h2>
      <button mat-raised-button (click)="openForm()">Add movie</button>
    </div>
    <table mat-table [dataSource]="items()">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let m">{{ m.name }}</td>
      </ng-container>
      <ng-container matColumnDef="duration">
        <th mat-header-cell *matHeaderCellDef>Duration</th>
        <td mat-cell *matCellDef="let m">{{ m.duration }}m</td>
      </ng-container>
      <ng-container matColumnDef="genres">
        <th mat-header-cell *matHeaderCellDef>Genres</th>
        <td mat-cell *matCellDef="let m">{{ names(m) }}</td>
      </ng-container>
      <ng-container matColumnDef="available">
        <th mat-header-cell *matHeaderCellDef>Available</th>
        <td mat-cell *matCellDef="let m">{{ m.available ? 'Yes' : 'No' }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let m" class="right">
          <button mat-icon-button (click)="openForm(m)"><mat-icon>edit</mat-icon></button>
          <button mat-icon-button (click)="remove(m)"><mat-icon>delete</mat-icon></button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols"></tr>
    </table>
  `,
  styles: `
    .head { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
    table { width:100%; background:transparent; }
    .right { text-align:right; }
  `,
})
export class MoviesAdmin {
  private svc = inject(MovieService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);
  items = signal<Movie[]>([]);
  cols = ['name', 'duration', 'genres', 'available', 'actions'];

  constructor() { this.load(); }
  async load() { this.items.set(await this.svc.list({ limit: 100 })); }
  names(m: Movie) { return m.genres.map(g => g.name).join(', '); }

  openForm(m?: Movie) {
    const data = m
      ? { id: m.id, name: m.name, duration: m.duration, available: m.available,
          release_date: m.release_date, poster_url: m.poster_url, imdb_link: m.imdb_link,
          short_description: m.short_description, genre_ids: m.genres.map(g => g.id) }
      : {};
    this.dialog.open(MovieFormDialog, { data, maxHeight: '90vh' })
      .afterClosed().subscribe(async (val: MovieInput | null) => {
        if (!val) return;
        try {
          m ? await this.svc.update(m.id, val) : await this.svc.create(val);
          this.snack.open('Saved', 'Close', { duration: 2500 });
          this.load();
        } catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }

  remove(m: Movie) {
    this.dialog.open(ConfirmDialog, { data: { title: 'Delete movie', message: `Delete "${m.name}"?`, confirmText: 'Delete' } })
      .afterClosed().subscribe(async (ok) => {
        if (!ok) return;
        try { await this.svc.remove(m.id); this.snack.open('Deleted', 'Close', { duration: 2500 }); this.load(); }
        catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }
}