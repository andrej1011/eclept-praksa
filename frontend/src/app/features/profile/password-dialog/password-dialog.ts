import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user.service';
import { apiError } from '../../../core/utils/api-error';

const strong = Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,255}$/);

@Component({
  selector: 'app-password-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Change password</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="col">
        <mat-form-field appearance="outline"><mat-label>Current password</mat-label>
          <input matInput type="password" formControlName="old_password" /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>New password</mat-label>
          <input matInput type="password" formControlName="new_password" />
          <mat-hint>8+ chars, upper, lower, digit, no spaces</mat-hint></mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button mat-raised-button [disabled]="form.invalid || saving()" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: `.col { display:flex; flex-direction:column; gap:16px; min-width:320px; padding-top:8px; }`,
})
export class PasswordDialog {
  private fb = inject(FormBuilder);
  private svc = inject(UserService);
  private ref = inject(MatDialogRef<PasswordDialog>);
  private snack = inject(MatSnackBar);
  saving = signal(false);
  form = this.fb.nonNullable.group({
    old_password: ['', Validators.required],
    new_password: ['', [Validators.required, strong]],
  });
  async save() {
    this.saving.set(true);
    try {
      const v = this.form.getRawValue();
      await this.svc.changePassword(v.old_password, v.new_password);
      this.snack.open('Password changed', 'Close', { duration: 2500 });
      this.ref.close(true);
    } catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
    finally { this.saving.set(false); }
  }
}