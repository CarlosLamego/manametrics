import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deck } from '../../../../models/deck.model';
import { DeckService } from '../../../../services/deck.service';
import { DeckHeader } from '../../components/deck-header/deck-header';

@Component({
  selector: 'app-deck-details',
  imports: [DeckHeader],
  templateUrl: './deck-details.html',
  styleUrl: './deck-details.scss',
})
export class DeckDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly deckService = inject(DeckService);

  deck?: Deck;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.deck = this.deckService.getById(id);

    console.log(this.deck);
  }
}
