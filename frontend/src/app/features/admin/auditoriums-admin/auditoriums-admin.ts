import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuditoriumService, AuditoriumInput } from '../../../core/services/auditorium.service';
import { Auditorium } from '../../../core/models/auditorium';
import { apiError } from '../../../core/utils/api-error';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { AuditoriumFormDialog } from './auditorium-form-dialog/auditorium-form-dialog';

@Component({
  selector: 'app-auditoriums-admin',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="head">
      <h2>Auditoriums</h2>
      <button mat-raised-button (click)="openForm()">Add auditorium</button>
    </div>
    <table mat-table [dataSource]="items()">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let a">{{ a.name }}</td>
      </ng-container>
      <ng-container matColumnDef="capacity">
        <th mat-header-cell *matHeaderCellDef>Capacity</th>
        <td mat-cell *matCellDef="let a">{{ a.capacity }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let a" class="right">
          <button mat-icon-button (click)="openForm(a)"><mat-icon>edit</mat-icon></button>
          <button mat-icon-button (click)="remove(a)"><mat-icon>delete</mat-icon></button>
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
export class AuditoriumsAdmin {
  private svc = inject(AuditoriumService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);
  items = signal<Auditorium[]>([]);
  cols = ['name', 'capacity', 'actions'];

  constructor() { this.load(); }
  async load() { this.items.set(await this.svc.list()); }

  openForm(a?: Auditorium) {
    this.dialog.open(AuditoriumFormDialog, { data: { id: a?.id, name: a?.name, capacity: a?.capacity } })
      .afterClosed().subscribe(async (val: AuditoriumInput | null) => {
        if (!val) return;
        try {
          a ? await this.svc.update(a.id, val) : await this.svc.create(val);
          this.snack.open('Saved', 'Close', { duration: 2500 });
          this.load();
        } catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }

  remove(a: Auditorium) {
    this.dialog.open(ConfirmDialog, { data: { title: 'Delete auditorium', message: `Delete "${a.name}"?`, confirmText: 'Delete' } })
      .afterClosed().subscribe(async (ok) => {
        if (!ok) return;
        try { await this.svc.delete(a.id); this.snack.open('Deleted', 'Close', { duration: 2500 }); this.load(); }
        catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }
}