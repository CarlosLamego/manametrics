import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deck } from '../../../../models/deck.model';
import { DeckService } from '../../../../services/deck.service';
import { DeckHeader } from '../../components/deck-header/deck-header';
import { CardService } from '../../../../services/card.service';
import { Card } from '../../../../models/card.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-deck-details',
  imports: [DeckHeader],
  templateUrl: './deck-details.html',
  styleUrl: './deck-details.scss',
})
export class DeckDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly deckService = inject(DeckService);
  private readonly cardService = inject(CardService);
  private readonly cdr = inject(ChangeDetectorRef);

  deck?: Deck;
  card?: Card;

  constructor() {
    console.log('DeckDetails criado');
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deck = this.deckService.getById(id);
    console.log(this.deck);

    console.log('ngOnInit');

    const txt = `2 Accursed Marauder
    2 Blood Fountain
    2 Bojuka Bog
    4 Cast Down

    2 Duress
    4 Relic of Progenitus`;

    this.deckService.importTxt(id, txt);

    console.log(this.deck);

    this.cardService.getByName('Cast Down')
      .subscribe({
        next: card => {
          this.card = card;
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
    setInterval(() => {
      console.log('Card atual:', this.card);
    }, 3000);
  }
}
