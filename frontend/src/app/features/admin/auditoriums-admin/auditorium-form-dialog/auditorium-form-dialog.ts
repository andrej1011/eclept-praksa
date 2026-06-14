import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuditoriumInput } from '../../../../core/services/auditorium.service';

@Component({
  selector: 'app-auditorium-form-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Edit' : 'New' }} auditorium</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="col">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Capacity</mat-label>
          <input matInput type="number" min="1" formControlName="capacity" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button mat-raised-button [disabled]="form.invalid" (click)="ref.close(form.getRawValue())">Save</button>
    </mat-dialog-actions>
  `,
  styles: `.col { display:flex; flex-direction:column; gap:8px; min-width:280px; }`,
})
export class AuditoriumFormDialog {
  private fb = inject(FormBuilder);
  ref = inject(MatDialogRef<AuditoriumFormDialog>);
  data = inject<{ id?: string } & Partial<AuditoriumInput>>(MAT_DIALOG_DATA);
  form = this.fb.nonNullable.group({
    name: [this.data.name ?? '', [Validators.required, Validators.maxLength(30)]],
    capacity: [this.data.capacity ?? 1, [Validators.required, Validators.min(1)]],
  });
}