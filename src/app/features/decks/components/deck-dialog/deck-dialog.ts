import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './deck-dialog.html',
  styleUrl: './deck-dialog.scss',
})
export class DeckDialog {
  private readonly fb = inject(FormBuilder);

  deckForm = this.fb.group({
    name: ['', Validators.required],
    format: ['', Validators.required]
  });

  private readonly dialogRef = inject(MatDialogRef);
  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.deckForm.getRawValue());
  }
}
