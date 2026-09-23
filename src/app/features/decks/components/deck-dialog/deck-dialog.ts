import { Component, inject } from '@angular/core';
import { DeckBuilderService } from '../../../../services/deck-builder.service';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { CardService } from '../../../../services/card.service';

import {
  FormBuilder,
  FormControl,
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
  readonly cardSearchControl = new FormControl('');
  private readonly _deckBuilderService = inject(DeckBuilderService);
  private readonly _cardService = inject(CardService);
  private readonly fb = inject(FormBuilder);

selectCard(cardName: string): void {
  this._cardService.getByName(cardName).subscribe(card => {
    if (!card) {
      return;
    }
    this.addCardToDecklist(card.name);
  });
}

  private addCardToDecklist(cardName: string): void {
  const currentDecklist = this.deckForm.controls.decklist.value ?? '';

  const lines = currentDecklist
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);

  const cardIndex = lines.findIndex(line => {
    const parts = line.split(' ');
    const name = parts.slice(1).join(' ');
    return name.toLowerCase() === cardName.toLowerCase();
  });

  if (cardIndex >= 0) {
    const parts = lines[cardIndex].split(' ');
    const quantity = Number(parts[0]);

    lines[cardIndex] = `${quantity + 1} ${cardName}`;
  } else {
    lines.push(`1 ${cardName}`);
  }

  this.deckForm.controls.decklist.setValue(
    lines.join('\n')
  );
}

  private readonly dialogRef =
    inject(MatDialogRef);

  readonly data =
    inject<Deck | undefined>(
      MAT_DIALOG_DATA,
      { optional: true }
    );

  cardSuggestions: string[] = [];

  deckForm = this.fb.group({
    name: ['', Validators.required],
    format: ['', Validators.required],
    decklist: ['']
  });

  constructor() {
    if (this.data) {
      this.deckForm.patchValue({
        name: this.data.name,
        format: this.data.format,
        decklist: this._deckBuilderService.toTxt(this.data)
      });
    }

    this.cardSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query || query.trim().length < 2) {
            return of({ data: [] });
          }

          return this._cardService.getSuggestions(query.trim());
        })
      )
      .subscribe(result => {
        this.cardSuggestions = result.data;
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