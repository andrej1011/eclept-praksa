import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { GenreService } from '../../../../core/services/genre.service';
import { Genre } from '../../../../core/models/genre';
import { MovieInput } from '../../../../core/services/movie.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-movie-form-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule,
            MatSelectModule, MatSlideToggleModule, MatButtonModule,MatDatepickerModule],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Edit' : 'New' }} movie</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="col">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label><input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Duration (min)</mat-label>
          <input matInput type="number" min="1" formControlName="duration" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Release date</mat-label>
          <input matInput [matDatepicker]="pick" formControlName="release_date" />
          <mat-datepicker-toggle matIconSuffix [for]="pick"></mat-datepicker-toggle>
          <mat-datepicker #pick></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Poster URL</mat-label><input matInput formControlName="poster_url" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>IMDb link</mat-label><input matInput formControlName="imdb_link" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Genres</mat-label>
          <mat-select formControlName="genre_ids" multiple>
            @for (g of genres(); track g.id) { <mat-option [value]="g.id">{{ g.name }}</mat-option> }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput rows="3" formControlName="short_description"></textarea>
        </mat-form-field>
        <mat-slide-toggle formControlName="available">Available</mat-slide-toggle>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button mat-raised-button [disabled]="form.invalid" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: `.col { display:flex; flex-direction:column; gap:8px; min-width:340px; }`,
})
export class MovieFormDialog {
  private fb = inject(FormBuilder);
  private genreSvc = inject(GenreService);
  ref = inject(MatDialogRef<MovieFormDialog>);
  data = inject<{ id?: string } & Partial<MovieInput>>(MAT_DIALOG_DATA);
  genres = signal<Genre[]>([]);

  form = this.fb.nonNullable.group({
    name: [this.data.name ?? '', [Validators.required, Validators.maxLength(255)]],
    duration: [this.data.duration ?? 90, [Validators.required, Validators.min(1)]],
    release_date: this.fb.control<Date | null>(this.data.release_date ? new Date(this.data.release_date) : null),
    poster_url: [this.data.poster_url ?? ''],
    imdb_link: [this.data.imdb_link ?? ''],
    genre_ids: [this.data.genre_ids ?? [] as string[]],
    short_description: [this.data.short_description ?? ''],
    available: [this.data.available ?? true],
  });

  constructor() { this.genreSvc.list().then(g => this.genres.set(g)); }

  save() {
    const v = this.form.getRawValue();
    const d = v.release_date;
    const release = d
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      : null;
    const payload: MovieInput = {
      name: v.name,
      duration: Number(v.duration),
      available: v.available,
      release_date: release,
      poster_url: v.poster_url || null,
      imdb_link: v.imdb_link || null,
      short_description: v.short_description || null,
      genre_ids: v.genre_ids,
    };
    this.ref.close(payload);
  }
}