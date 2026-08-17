import { Component, inject } from '@angular/core';
import { DeckBuilderService } from '../../../../services/deck-builder.service';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Deck } from '../../../../models/deck.model';

@Component({
  selector: 'app-deck-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './deck-dialog.html',
  styleUrl: './deck-dialog.scss',
})
export class DeckDialog {
  private readonly _deckBuilderService = inject(DeckBuilderService);

  private readonly fb = inject(FormBuilder);

  private readonly dialogRef =
    inject(MatDialogRef);

  readonly data =
    inject<Deck | undefined>(
      MAT_DIALOG_DATA,
      { optional: true }
    );

  deckForm = this.fb.group({
    name: ['', Validators.required],
    format: ['', Validators.required],
    decklist: ['']
  });

  constructor() {
    if (!this.data) {
      return;
    }
    this.deckForm.patchValue({
      name: this.data.name,
      format: this.data.format,
      decklist: this._deckBuilderService.toTxt(this.data)
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(
      this.deckForm.getRawValue()
    );
  }

  onFileSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      const content =
        reader.result as string;

      this.deckForm.patchValue({
        decklist: content
      });

    };

    reader.readAsText(file);

    input.value = '';
  }
}