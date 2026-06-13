import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MovieService } from '../../../../core/services/movie.service';
import { AuditoriumService } from '../../../../core/services/auditorium.service';
import { Movie } from '../../../../core/models/movie';
import { Auditorium } from '../../../../core/models/auditorium';

@Component({
  selector: 'app-bulk-showing-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
            MatButtonModule, MatIconModule, MatDatepickerModule, MatTimepickerModule],
  template: `
    <h2 mat-dialog-title>Bulk add showings</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="col">
        <mat-form-field appearance="outline">
          <mat-label>Movie</mat-label>
          <mat-select formControlName="movie_id">
            @for (m of movies(); track m.id) { <mat-option [value]="m.id">{{ m.name }}</mat-option> }
          </mat-select>
        </mat-form-field>
        @if (durationNote()) { <p class="note">{{ durationNote() }}</p> }
        <mat-form-field appearance="outline">
          <mat-label>Auditorium</mat-label>
          <mat-select formControlName="auditorium_id">
            @for (a of auds(); track a.id) { <mat-option [value]="a.id">{{ a.name }}</mat-option> }
          </mat-select>
        </mat-form-field>

        <div formArrayName="slots">
          @for (s of slots.controls; track $index) {
            <div class="slot" [formGroupName]="$index">
              <mat-form-field appearance="outline">
                <mat-label>Date</mat-label>
                <input matInput [matDatepicker]="dp" formControlName="date" />
                <mat-datepicker-toggle matIconSuffix [for]="dp"></mat-datepicker-toggle>
                <mat-datepicker #dp />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Time</mat-label>
                <input matInput [matTimepicker]="tp" formControlName="time" />
                <mat-timepicker-toggle matIconSuffix [for]="tp"></mat-timepicker-toggle>
                <mat-timepicker #tp interval="15min" />
              </mat-form-field>
              <button mat-icon-button (click)="slots.removeAt($index)" [disabled]="slots.length === 1">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          }
        </div>
        <button mat-stroked-button (click)="add()"><mat-icon>add</mat-icon> Add slot</button>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button mat-raised-button [disabled]="form.invalid" (click)="save()">Create {{ slots.length }}</button>
    </mat-dialog-actions>
  `,
  styles: `
    .col { display:flex; flex-direction:column; gap:8px; min-width:360px; }
    .slot { display:flex; gap:8px; align-items:center; }
    .note { margin:-2px 0 4px; color:var(--mat-sys-on-surface-variant); font-size:13px; }
  `,
})
export class BulkShowingDialog {
  private fb = inject(FormBuilder);
  private movieSvc = inject(MovieService);
  private audSvc = inject(AuditoriumService);
  ref = inject(MatDialogRef<BulkShowingDialog>);
  movies = signal<Movie[]>([]);
  auds = signal<Auditorium[]>([]);

  form = this.fb.group({
    movie_id: ['', Validators.required],
    auditorium_id: ['', Validators.required],
    slots: this.fb.array([this.slot()]),
  });

  durationNote(): string {
    const m = this.movies().find(x => x.id === this.form.controls.movie_id.value);
    if (!m) return '';
    const h = Math.floor(m.duration / 60), min = m.duration % 60;
    return `*Movie duration: ${h}hrs ${String(min).padStart(2, '0')}mins`;
  }

  get slots() { return this.form.get('slots') as FormArray; }
  private slot(): FormGroup {
    return this.fb.group({
      date: this.fb.control<Date>(new Date(), { nonNullable: true, validators: Validators.required }),
      time: this.fb.control<Date>(new Date(), { nonNullable: true, validators: Validators.required }),
    });
  }
  add() { this.slots.push(this.slot()); }

  constructor() {
    this.movieSvc.list({ limit: 100 }).then(m => this.movies.set(m));
    this.audSvc.list().then(a => this.auds.set(a));
  }

  save() {
    const v = this.form.getRawValue();
    const starts = (v.slots as { date: Date; time: Date }[]).map(({ date: d, time: t }) =>
      new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes())).toISOString());
    this.ref.close({ movie_id: v.movie_id, auditorium_id: v.auditorium_id, starts });
  }
}