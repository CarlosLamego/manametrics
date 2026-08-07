import { Injectable, inject } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { ImportTxtService } from './import-txt.service';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root'
})
export class DeckBuilderService {

  private readonly _importTxtService = inject(ImportTxtService);
  private readonly _cardService = inject(CardService);

  build(txt: string) {
    return this._importTxtService.import(txt);
  }

  calculateColors(deck: Deck): string[] {

    const colors = new Set<string>();

    for (const deckCard of deck.mainboard) {

      const card = deckCard.card ??
        this._cardService.getCached(deckCard.name);

      if (!card) {
        continue;
      }

      for (const color of card.colors) {
        colors.add(color);
      }

    }

    return [...colors];
  }

}