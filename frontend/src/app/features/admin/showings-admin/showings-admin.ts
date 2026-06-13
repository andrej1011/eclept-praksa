import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowingService, ShowingInput } from '../../../core/services/showing.service';
import { MovieService } from '../../../core/services/movie.service';
import { AuditoriumService } from '../../../core/services/auditorium.service';
import { Showing } from '../../../core/models/showing';
import { apiError } from '../../../core/utils/api-error';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { ShowingFormDialog } from './showing-form-dialog/showing-form-dialog';
import { BulkShowingDialog } from './bulk-showing-dialog/bulk-showing-dialog';

@Component({
  selector: 'app-showings-admin',
  imports: [DatePipe, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="head">
      <h2>Showings</h2>
      <button mat-stroked-button (click)="bulkAdd()">Add multiple</button>
      <button mat-raised-button (click)="openForm()">Add showing</button>
      
    </div>
    <table mat-table [dataSource]="items()">
      <ng-container matColumnDef="movie">
        <th mat-header-cell *matHeaderCellDef>Movie</th>
        <td mat-cell *matCellDef="let s">{{ movieName(s.movie_id) }}</td>
      </ng-container>
      <ng-container matColumnDef="aud">
        <th mat-header-cell *matHeaderCellDef>Auditorium</th>
        <td mat-cell *matCellDef="let s">{{ audName(s.auditorium_id) }}</td>
      </ng-container>
      <ng-container matColumnDef="time">
        <th mat-header-cell *matHeaderCellDef>Start</th>
        <td mat-cell *matCellDef="let s">{{ s.start_time | date:'dd.MM.y. HH:mm' }}</td>
      </ng-container>
      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let s">{{ s.status }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let s" class="right">
          <button mat-icon-button (click)="openForm(s)"><mat-icon>edit</mat-icon></button>
          @if (s.status === 'active') {
            <button mat-icon-button (click)="cancel(s)" title="Cancel"><mat-icon>block</mat-icon></button>
          }
          <button mat-icon-button (click)="remove(s)"><mat-icon>delete</mat-icon></button>
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
export class ShowingsAdmin {
  private svc = inject(ShowingService);
  private movieSvc = inject(MovieService);
  private audSvc = inject(AuditoriumService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  items = signal<Showing[]>([]);
  private movies = signal<Map<string, string>>(new Map());
  private auds = signal<Map<string, string>>(new Map());
  cols = ['movie', 'aud', 'time', 'status', 'actions'];

  constructor() { this.load(); }

  async load() {
    const [showings, ms, as] = await Promise.all([this.svc.list(), this.movieSvc.list({ limit: 100 }), this.audSvc.list()]);
    this.movies.set(new Map(ms.map(m => [m.id, m.name])));
    this.auds.set(new Map(as.map(a => [a.id, a.name])));
    this.items.set(showings);
  }
  movieName(id: string) { return this.movies().get(id) ?? '—'; }
  audName(id: string) { return this.auds().get(id) ?? '—'; }

  openForm(s?: Showing) {
    this.dialog.open(ShowingFormDialog, { data: s ? { id: s.id, movie_id: s.movie_id, auditorium_id: s.auditorium_id, start_time: s.start_time } : {} })
      .afterClosed().subscribe(async (val: ShowingInput | null) => {
        if (!val) return;
        try {
          s ? await this.svc.update(s.id, val) : await this.svc.create(val);
          this.snack.open('Saved', 'Close', { duration: 2500 });
          this.load();
        } catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }

  cancel(s: Showing) {
    this.dialog.open(ConfirmDialog, { data: { title: 'Cancel showing', message: 'Cancel this showing? Bookings will be cancelled.', confirmText: 'Cancel showing', cancelText: 'Keep' } })
      .afterClosed().subscribe(async (ok) => {
        if (!ok) return;
        try { await this.svc.cancel(s.id); this.snack.open('Cancelled', 'Close', { duration: 2500 }); this.load(); }
        catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }

  remove(s: Showing) {
    this.dialog.open(ConfirmDialog, { data: { title: 'Delete showing', message: 'Delete this showing?', confirmText: 'Delete' } })
      .afterClosed().subscribe(async (ok) => {
        if (!ok) return;
        try { await this.svc.remove(s.id); this.snack.open('Deleted', 'Close', { duration: 2500 }); this.load(); }
        catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }

  bulkAdd() {
    this.dialog.open(BulkShowingDialog).afterClosed().subscribe(async (res: { movie_id: string; auditorium_id: string; starts: string[] } | null) => {
      if (!res) return;
      const out = await Promise.allSettled(res.starts.map(s =>
        this.svc.create({ movie_id: res.movie_id, auditorium_id: res.auditorium_id, start_time: s })));
      const ok = out.filter(r => r.status === 'fulfilled').length;
      const fail = out.length - ok;
      this.snack.open(`${ok} added${fail ? `, ${fail} failed (conflicts)` : ''}`, 'Close', { duration: 4000 });
      this.load();
    });
  }
}