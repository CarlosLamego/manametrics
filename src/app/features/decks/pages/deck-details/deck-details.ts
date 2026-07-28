import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deck } from '../../../../models/deck.model';
import { DeckService } from '../../../../services/deck.service';
import { DeckHeader } from '../../components/deck-header/deck-header';
import { ImportTxtService } from '../../../../services/import-txt.service';

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


    const txt = `2 Accursed Marauder
    2 Blood Fountain
    2 Bojuka Bog
    4 Cast Down

    2 Duress
    4 Relic of Progenitus`;

    this.deckService.importTxt(id, txt);

    console.log(this.deck);
  }


}
