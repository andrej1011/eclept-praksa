import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowingService } from '../../core/services/showing.service';
import { MovieService } from '../../core/services/movie.service';
import { AuditoriumService } from '../../core/services/auditorium.service';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { apiError } from '../../core/utils/api-error';
import { Showing } from '../../core/models/showing';
import { Auditorium } from '../../core/models/auditorium';

@Component({
  selector: 'app-booking',
  imports: [DatePipe, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    @if (loading()) { <p class="muted">Loading…</p> }
    @else if (showing(); as s) {
      <div class="book">
        <h1>Book tickets</h1>
        <div class="summary">
          <p class="movie">{{ movieName() }}</p>
          <p>{{ s.start_time | date:'EEEE, dd. MMMM y.' }}</p>
          <p>{{ s.start_time | date:'HH:mm' }}</p>
          <p>{{ audName() }}</p>
          <p class="muted">{{ seatsLeft() }} seats left</p>
        </div>
        @if (seatsLeft() > 0) {
          <mat-form-field appearance="outline">
            <mat-label>Tickets</mat-label>
            <input matInput type="number" min="1" [max]="seatsLeft()" [(ngModel)]="seats" />
          </mat-form-field>
          <button mat-raised-button
            [disabled]="submitting() || seats < 1 || seats > seatsLeft()" (click)="confirm()">
            {{ submitting() ? 'Booking…' : 'Confirm booking' }}
          </button>
        } @else { <p class="muted">This showing is sold out.</p> }
      </div>
    } @else { <p class="muted">Showing not found.</p> }
  `,
  styles: `
    .muted { color:var(--mat-sys-on-surface-variant); }
    .book { max-width:420px; padding:32px 24px; display:flex; flex-direction:column; gap:16px; }
    .summary { background:var(--mat-sys-surface-container); border-radius:12px; padding:16px; }
    .summary p { margin:2px 0; }
    .movie { font-size:18px; font-weight:600; }
  `,
})
export class Booking {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private showingSvc = inject(ShowingService);
  private movieSvc = inject(MovieService);
  private audSvc = inject(AuditoriumService);
  private bookingSvc = inject(BookingService);
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);

  showing = signal<Showing | null>(null);
  loading = signal(true);
  submitting = signal(false);
  seats = 1;
  movieName = signal('');
  private aud = signal<Auditorium | null>(null);

  seatsLeft = computed(() => {
    const s = this.showing(), a = this.aud();
    return s && a ? Math.max(0, a.capacity - s.booked_seats) : 0;
  });
  audName = computed(() => this.aud()?.name ?? '');

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.showingSvc.get(id).then(async (s) => {
      this.showing.set(s);
      const [mv, auds] = await Promise.all([this.movieSvc.get(s.movie_id), this.audSvc.list()]);
      this.movieName.set(mv.name);
      this.aud.set(auds.find(a => a.id === s.auditorium_id) ?? null);
    }).finally(() => this.loading.set(false));
  }

  async confirm() {
    const s = this.showing(), user = this.auth.user();
    if (!s || !user) return;
    this.submitting.set(true);
    try {
      await this.bookingSvc.create({ user_id: user.id, showing_id: s.id, seats: Number(this.seats) });
      this.snack.open('Booking confirmed', 'Close', { duration: 3000 });
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.snack.open(e?.status === 409 ? 'Not enough seats available.' : apiError(e),
        'Close', { duration: 4000 });
    } finally {
      this.submitting.set(false);
    }
  }
}