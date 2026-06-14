import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { apiError } from '../../core/utils/api-error';
import { PasswordDialog } from './password-dialog/password-dialog';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="wrap">
      <h1>My profile</h1>
      <form [formGroup]="form" class="col">
        <mat-form-field appearance="outline"><mat-label>Username</mat-label>
          <input matInput [value]="auth.currentUser()?.username" disabled /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>First name</mat-label>
          <input matInput formControlName="first_name" /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Last name</mat-label>
          <input matInput formControlName="last_name" /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Phone</mat-label>
          <input matInput formControlName="phone_number" placeholder="+3816xxxxxxx" /></mat-form-field>
        <div class="row">
          <button mat-raised-button [disabled]="form.invalid || saving()" (click)="save()">Save</button>
          <button mat-stroked-button (click)="changePw()">Change password</button>
        </div>
      </form>
    </div>
  `,
  styles: `
    .wrap { max-width: 520px; margin: 0 auto; }
    .col { display: flex; flex-direction: column; gap: 16px; }
    .row { display: flex; gap: 12px; }
  `,
})
export class Profile {
  private fb = inject(FormBuilder);
  private svc = inject(UserService);
  auth = inject(AuthService);
  private snack = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  saving = signal(false);
  private u = this.auth.currentUser();

  form = this.fb.nonNullable.group({
    first_name: [this.u?.first_name ?? ''],
    last_name: [this.u?.last_name ?? ''],
    email: [this.u?.email ?? '', [Validators.required, Validators.email]],
    phone_number: [this.u?.phone_number ?? ''],
  });

  async save() {
    this.saving.set(true);
    try {
      const v = this.form.getRawValue();
      const updated = await this.svc.updateProfile({
        first_name: v.first_name || null, last_name: v.last_name || null,
        email: v.email, phone_number: v.phone_number || null,
      });
      this.auth.currentUser.set(updated);
      this.snack.open('Profile updated', 'Close', { duration: 2500 });
    } catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
    finally { this.saving.set(false); }
  }
  changePw() { this.dialog.open(PasswordDialog, { width: '380px' }); }
}