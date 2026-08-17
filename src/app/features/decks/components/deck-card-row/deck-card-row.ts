import { Component, input } from '@angular/core';

import { DeckCard } from '../../../../models/deck-card.model';

import { CardPreview } from '../../../cards/components/card-preview/card-preview';

@Component({
  selector: 'app-deck-card-row',
  imports: [CardPreview],
  templateUrl: './deck-card-row.html',
  styleUrl: './deck-card-row.scss',
})
export class DeckCardRow {
  deckCard = input.required<DeckCard>();
}