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

  importDeck = output<void>();

    onImportClick(): void {
    console.log('HEADER');
    this.importDeck.emit();
  }
}
