import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar class="footer">
      <span>© 2026 MovieMate</span>
    </mat-toolbar>
  `,
  styles: `
    .footer {
      justify-content: center;
      font-size: 14px;
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class Footer {}