import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { apiError } from '../../../core/utils/api-error';
import { RegisterRequest } from '../../../core/models/auth';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

// same as backend: min8 max255, upper, lower, digit, no spaces
const PW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,255}$/;

function passwordsMatch(g: AbstractControl): ValidationErrors | null {
  return g.get('password')?.value === g.get('confirm_password')?.value
    ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="auth-page">
      <form class="auth-card" [formGroup]="form" (ngSubmit)="submit()">
        <h1>Register</h1>
        <mat-form-field appearance="outline">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
          <mat-hint>8+ chars, upper, lower, digit, no spaces</mat-hint>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Confirm password</mat-label>
          <input matInput type="password" formControlName="confirm_password" />
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>First name (optional)</mat-label>
          <input matInput formControlName="first_name" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Last name (optional)</mat-label>
          <input matInput formControlName="last_name" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Email (optional)</mat-label>
          <input matInput formControlName="email" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Phone (optional)</mat-label>
          <input matInput formControlName="phone_number" />
          <mat-hint>e.g. +381641234567</mat-hint>
        </mat-form-field>
        @if (form.hasError('passwordMismatch') && form.get('confirm_password')?.touched) {
          <p class="error">Passwords do not match</p>
        }
        @if (error()) { <p class="error">{{ error() }}</p> }
        <button mat-raised-button type="submit" [disabled]="loading() || form.invalid">
          {{ loading() ? 'Creating…' : 'Register' }}
        </button>
        <p class="alt">Have an account? <a routerLink="/login">Login</a></p>
      </form>
    </div>
  `,
  styles: `
    .auth-page { display: flex; justify-content: center; padding: 48px 16px; }
    .auth-card { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 360px; }
    .error { color: var(--mat-sys-error); margin: 0; }
    .alt { text-align: center; }
  `,
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  error = signal<string | null>(null);
  loading = signal(false);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    password: ['', [Validators.required, Validators.pattern(PW)]],
    confirm_password: ['', Validators.required],
    first_name: ['', Validators.maxLength(100)],
    last_name: ['', Validators.maxLength(100)],
    email: ['', Validators.email],
    phone_number: [''],
  }, { validators: passwordsMatch });

  constructor() {
    if (this.auth.isLoggedIn()) this.promptLogout();
  }

  private promptLogout(): void {
    this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Already logged in',
        message: `You are logged in as ${this.auth.user()?.username}. Log out?`,
        confirmText: 'Log out',
      },
    }).afterClosed().subscribe((ok) => {
      if (ok) this.auth.clearSession();
      else history.length > 1 ? history.back() : this.router.navigate(['/']);
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;
    this.loading.set(true); this.error.set(null);
    const v = this.form.getRawValue();
    const payload: RegisterRequest = {
      username: v.username,
      password: v.password,
      confirm_password: v.confirm_password,
      first_name: v.first_name || null,
      last_name: v.last_name || null,
      email: v.email || null,
      phone_number: v.phone_number || null,
    };
    try {
      await this.auth.register(payload);
      this.router.navigate(['/login']);   // backend gives no token
    } catch (e) {
      this.error.set(apiError(e));
    } finally {
      this.loading.set(false);
    }
  }
}