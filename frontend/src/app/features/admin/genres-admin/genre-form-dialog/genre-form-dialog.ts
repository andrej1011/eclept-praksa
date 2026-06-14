import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-genre-form-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Edit' : 'New' }} genre</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" style="width:100%">
        <mat-label>Name</mat-label>
        <input matInput [formControl]="name" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button mat-raised-button [disabled]="name.invalid" (click)="ref.close(name.value)">Save</button>
    </mat-dialog-actions>
  `,
})
export class GenreFormDialog {
  ref = inject(MatDialogRef<GenreFormDialog>);
  data = inject<{ id?: string; name?: string }>(MAT_DIALOG_DATA);
  name = new FormControl(this.data.name ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(30)] });
}