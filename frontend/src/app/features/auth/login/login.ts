import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { apiError } from '../../../core/utils/api-error';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="auth-page">
      <form class="auth-card" [formGroup]="form" (ngSubmit)="submit()">
        <h1>Login</h1>
        <mat-form-field appearance="outline">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
        </mat-form-field>
        @if (error()) { <p class="error">{{ error() }}</p> }
        <button mat-raised-button type="submit" [disabled]="loading() || form.invalid">
          {{ loading() ? 'Signing in…' : 'Login' }}
        </button>
        <p class="alt">No account? <a routerLink="/register">Register</a></p>
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
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  error = signal<string | null>(null);
  loading = signal(false);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

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
      if (ok) this.auth.clearSession();                       // stay, form usable
      else history.length > 1 ? history.back() : this.router.navigate(['/']);
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;
    this.loading.set(true); this.error.set(null);
    try {
      await this.auth.login(this.form.getRawValue());
      const back = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
      this.router.navigateByUrl(back);
    } catch (e) {
      this.error.set(apiError(e));
    } finally {
      this.loading.set(false);
    }
  }
}