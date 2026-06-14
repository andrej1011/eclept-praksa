import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreService } from '../../../core/services/genre.service';
import { Genre } from '../../../core/models/genre';
import { apiError } from '../../../core/utils/api-error';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { GenreFormDialog } from './genre-form-dialog/genre-form-dialog';

@Component({
  selector: 'app-genres-admin',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="head">
      <h2>Genres</h2>
      <button mat-raised-button (click)="openForm()">Add genre</button>
    </div>
    <table mat-table [dataSource]="genres()">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let g">{{ g.name }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let g" class="right">
          <button mat-icon-button (click)="openForm(g)"><mat-icon>edit</mat-icon></button>
          <button mat-icon-button (click)="remove(g)"><mat-icon>delete</mat-icon></button>
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
export class GenresAdmin {
  private svc = inject(GenreService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);
  genres = signal<Genre[]>([]);
  cols = ['name', 'actions'];

  constructor() { this.load(); }
  async load() { this.genres.set(await this.svc.list()); }

  openForm(g?: Genre) {
    this.dialog.open(GenreFormDialog, { data: { id: g?.id, name: g?.name }, width: '360px' })
      .afterClosed().subscribe(async (name: string | null) => {
        if (name == null) return;
        try {
          g ? await this.svc.update(g.id, name) : await this.svc.create(name);
          this.snack.open('Saved', 'Close', { duration: 2500 });
          this.load();
        } catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }

  remove(g: Genre) {
    this.dialog.open(ConfirmDialog, { data: { title: 'Delete genre', message: `Delete "${g.name}"?`, confirmText: 'Delete' } })
      .afterClosed().subscribe(async (ok) => {
        if (!ok) return;
        try { await this.svc.delete(g.id); this.snack.open('Deleted', 'Close', { duration: 2500 }); this.load(); }
        catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }
}