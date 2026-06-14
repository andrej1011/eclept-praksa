import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user';
import { apiError } from '../../../core/utils/api-error';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-users-admin',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="head"><h2>Users</h2></div>
    <table mat-table [dataSource]="items()">
      <ng-container matColumnDef="username"><th mat-header-cell *matHeaderCellDef>Username</th><td mat-cell *matCellDef="let u">{{ u.username }}</td></ng-container>
      <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Name</th><td mat-cell *matCellDef="let u">{{ u.first_name }} {{ u.last_name }}</td></ng-container>
      <ng-container matColumnDef="email"><th mat-header-cell *matHeaderCellDef>Email</th><td mat-cell *matCellDef="let u">{{ u.email }}</td></ng-container>
      <ng-container matColumnDef="phone"><th mat-header-cell *matHeaderCellDef>Phone</th><td mat-cell *matCellDef="let u">{{ u.phone_number }}</td></ng-container>
      <ng-container matColumnDef="role"><th mat-header-cell *matHeaderCellDef>Role</th><td mat-cell *matCellDef="let u">{{ u.role }}</td></ng-container>
      <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let u" class="right">
          @if (u.id !== me()?.id) { <button mat-icon-button (click)="remove(u)"><mat-icon>delete</mat-icon></button> }
        </td></ng-container>
      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols"></tr>
    </table>
  `,
  styles: `.head { margin-bottom:16px; } table { width:100%; background:transparent; } .right { text-align:right; }`,
})
export class UsersAdmin {
  private svc = inject(UserService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);
  private auth = inject(AuthService);
  items = signal<User[]>([]);
  cols = ['username', 'name', 'email', 'phone', 'role', 'actions'];
  me = this.auth.currentUser;

  constructor() { this.load(); }
  async load() { this.items.set(await this.svc.list()); }

  remove(u: User) {
    this.dialog.open(ConfirmDialog, { data: { title: 'Delete user', message: `Delete "${u.username}"?`, confirmText: 'Delete' } })
      .afterClosed().subscribe(async (ok) => {
        if (!ok) return;
        try { await this.svc.remove(u.id); this.snack.open('Deleted', 'Close', { duration: 2500 }); this.load(); }
        catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
      });
  }
}