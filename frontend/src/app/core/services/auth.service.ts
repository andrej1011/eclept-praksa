import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { LoginRequest, RegisterRequest, LoginResponse } from '../models/auth';

const TOKEN_KEY = 'access_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUser = signal<User | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  async login(creds: LoginRequest): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<LoginResponse>(`${environment.apiUrl}/login`, creds),
    );
    localStorage.setItem(TOKEN_KEY, res.access_token);
    this.currentUser.set(res.user);
  }

  // backend return user, no token → caller redirect to /login
  register(data: RegisterRequest): Promise<User> {
    return firstValueFrom(
      this.http.post<User>(`${environment.apiUrl}/register`, data),
    );
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  // app start: token present → restore user; fail → clear
  async restoreSession(): Promise<void> {
    if (!this.token) return;
    try {
      const user = await firstValueFrom(
        this.http.get<User>(`${environment.apiUrl}/users/me`),
      );
      this.currentUser.set(user);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      this.currentUser.set(null);
    }
  }

}