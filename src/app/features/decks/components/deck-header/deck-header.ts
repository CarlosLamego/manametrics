import { Component, input, output } from '@angular/core';
import { Deck } from '../../../../models/deck.model';

@Component({
  selector: 'app-deck-header',
  imports: [],
  templateUrl: './deck-header.html',
  styleUrl: './deck-header.scss',
})
export class DeckHeader {

  deck = input.required<Deck>();

  editDeck = output<void>();
  exportDeck = output<void>();

  onEditClick(): void {
    this.editDeck.emit();
  }

  onExportClick(): void {
    this.exportDeck.emit();
  }
}