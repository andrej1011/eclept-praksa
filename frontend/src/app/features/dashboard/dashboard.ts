import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../../core/services/booking.service';
import { ShowingService } from '../../core/services/showing.service';
import { MovieService } from '../../core/services/movie.service';
import { apiError } from '../../core/utils/api-error';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

interface BookingVM { id: string; seats: number; status: string; movieName: string; startTime: string; }

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, MatTabsModule, MatButtonModule],
  template: `
    <h1 class="title">My Bookings</h1>
    @if (loading()) { <p class="muted">Loading…</p> }
    @else {
      <mat-tab-group>
        <mat-tab label="Upcoming">
          <ng-template matTabContent>
            @if (upcoming().length === 0) { <p class="muted">No upcoming bookings.</p> }
            @for (b of upcoming(); track b.id) {
              <div class="row">
                <div>
                  <p class="m">{{ b.movieName }}</p>
                   <p class="muted">
                    {{ b.startTime | date:'EEE, d. MMMM y. · HH:mm' }} · 
                    {{ b.seats }} seat{{ b.seats > 1 ? 's' : '' }}
                  </p>
                </div>
                @if (b.status === 'active') { <button mat-stroked-button (click)="cancel(b)">Cancel</button> }
                @else { <span class="muted">{{ b.status }}</span> }
              </div>
            }
          </ng-template>
        </mat-tab>
        <mat-tab label="Past">
          <ng-template matTabContent>
            @if (past().length === 0) { <p class="muted">No past bookings.</p> }
            @for (b of past(); track b.id) {
              <div class="row">
                <div>
                  <p class="m">{{ b.movieName }}</p>
                  <p class="muted">
                    {{ b.startTime | date:'EEE, d. MMMM y. · HH:mm' }} · 
                    {{ b.seats }} seat{{ b.seats > 1 ? 's' : '' }}
                  </p>
                </div>
                <span class="muted">{{ b.status }}</span>
              </div>
            }
          </ng-template>
        </mat-tab>
      </mat-tab-group>
    }
  `,
  styles: `
    .title { padding:24px 24px 0; }
    .muted { color:var(--mat-sys-on-surface-variant); padding:0 4px; }
    .row { display:flex; justify-content:space-between; align-items:center; gap:16px;
           padding:14px 20px; border-bottom:1px solid var(--mat-sys-outline-variant); }
    .m { font-weight:600; margin:0 0 2px; } p { margin:0; }
  `,
})
export class Dashboard {
  private bookingSvc = inject(BookingService);
  private showingSvc = inject(ShowingService);
  private movieSvc = inject(MovieService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  private items = signal<BookingVM[]>([]);
  loading = signal(true);

  upcoming = computed(() => this.items().filter(b => new Date(b.startTime).getTime() >= Date.now()));
  past = computed(() => this.items().filter(b => new Date(b.startTime).getTime() < Date.now()));

  constructor() { this.load(); }

  async load() {
    this.loading.set(true);
    try {
      const bookings = await this.bookingSvc.mine();
      this.items.set(await Promise.all(bookings.map(async (b) => {
        const s = await this.showingSvc.get(b.showing_id);
        const m = await this.movieSvc.get(s.movie_id);
        return { id: b.id, seats: b.seats, status: b.status, movieName: m.name, startTime: s.start_time };
      })));
    } finally { this.loading.set(false); }
  }

  cancel(b: BookingVM) {
    this.dialog.open(ConfirmDialog, {
      data: { title: 'Cancel booking', message: `Cancel ${b.seats} seat${ b.seats > 1 ? 's' : '' } for ${b.movieName}?`,
              confirmText: 'Cancel booking', cancelText: 'Keep' },
    }).afterClosed().subscribe(async (ok) => {
      if (!ok) return;
      try {
        await this.bookingSvc.cancel(b.id);
        this.snack.open('Booking cancelled', 'Close', { duration: 3000 });
        this.load();
      } catch (e) { this.snack.open(apiError(e), 'Close', { duration: 4000 }); }
    });
  }
}