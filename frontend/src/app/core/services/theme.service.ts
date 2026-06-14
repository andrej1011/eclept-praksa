import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';
const KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private saved = localStorage.getItem(KEY) as Theme | null;
  theme = signal<Theme>(this.saved ?? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.classList.toggle('light', t === 'light');
      localStorage.setItem(KEY, t);
    });
  }
  toggle() { this.theme.set(this.theme() === 'dark' ? 'light' : 'dark'); }
}