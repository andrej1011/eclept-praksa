import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar class="footer">
      <span>© 2026 Copyright <a href="https://github.com/andrej1011/eclept-praksa">Eclept & Andrej Rajkov</a></span>
    </mat-toolbar>
  `,
  styles: `
    .footer {
      justify-content: center;
      font-size: 12px;
      color: var(--mat-sys-on-surface-variant);
    }
    a { color: var(--mat-sys-on-surface-variant); text-decoration: none; }
    a:hover { color: var(--mat-sys-on-surface); text-decoration: underline; }
  `,
})
export class Footer {}