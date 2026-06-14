import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MovieService } from '../../../../core/services/movie.service';
import { AuditoriumService } from '../../../../core/services/auditorium.service';
import { Movie } from '../../../../core/models/movie';
import { Auditorium } from '../../../../core/models/auditorium';
import { ShowingInput } from '../../../../core/services/showing.service';

@Component({
  selector: 'app-showing-form-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule,
            MatSelectModule, MatButtonModule, MatDatepickerModule, MatTimepickerModule],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Edit' : 'New' }} showing</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="col">
        <mat-form-field appearance="outline">
          <mat-label>Movie</mat-label>
          <mat-select formControlName="movie_id">
            @for (m of movies(); track m.id) { <mat-option [value]="m.id">{{ m.name }}</mat-option> }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Auditorium</mat-label>
          <mat-select formControlName="auditorium_id">
            @for (a of auds(); track a.id) { <mat-option [value]="a.id">{{ a.name }}</mat-option> }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="dp" formControlName="date" />
          <mat-datepicker-toggle matIconSuffix [for]="dp"></mat-datepicker-toggle>
          <mat-datepicker #dp>
            <mat-datepicker-actions>
              <button mat-button (click)="form.controls.date.setValue(now)">Today</button>
              <button mat-button matDatepickerCancel>Cancel</button>
              <button mat-raised-button matDatepickerApply>Apply</button>
            </mat-datepicker-actions>
          </mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Time</mat-label>
          <input matInput [matTimepicker]="tp" formControlName="time" />
          <mat-timepicker-toggle matIconSuffix [for]="tp"></mat-timepicker-toggle>
          <mat-timepicker #tp interval="15min" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button mat-raised-button [disabled]="form.invalid" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: `.col { display:flex; flex-direction:column; gap:8px; min-width:320px; }`,
})
export class ShowingFormDialog {
  private fb = inject(FormBuilder);
  private movieSvc = inject(MovieService);
  private audSvc = inject(AuditoriumService);
  ref = inject(MatDialogRef<ShowingFormDialog>);
  data = inject<{ id?: string; movie_id?: string; auditorium_id?: string; start_time?: string }>(MAT_DIALOG_DATA);
  movies = signal<Movie[]>([]);
  auds = signal<Auditorium[]>([]);
  now = new Date();

  form = this.fb.nonNullable.group({
    movie_id: [this.data.movie_id ?? '', Validators.required],
    auditorium_id: [this.data.auditorium_id ?? '', Validators.required],
    date: this.fb.control<Date>(this.data.start_time ? new Date(this.data.start_time) : new Date(), { nonNullable: true, validators: Validators.required }),
    time: this.fb.control<Date>(this.data.start_time ? new Date(this.data.start_time) : new Date(), { nonNullable: true, validators: Validators.required }),
  });

  constructor() {
    this.movieSvc.list({ limit: 100 }).then(m => this.movies.set(m));
    this.audSvc.list().then(a => this.auds.set(a));
  }

  save() {
    const v = this.form.getRawValue();
    const d = v.date, t = v.time;
    const combined = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes()));
    const payload: ShowingInput = {
      movie_id: v.movie_id,
      auditorium_id: v.auditorium_id,
      start_time: combined.toISOString(),
    };
    this.ref.close(payload);
  }
}