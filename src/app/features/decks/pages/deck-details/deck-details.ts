import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deck } from '../../../../models/deck.model';
import { DeckService } from '../../../../services/deck.service';
import { DeckHeader } from '../../components/deck-header/deck-header';
import { CardService } from '../../../../services/card.service';
import { Card } from '../../../../models/card.model';
import { ChangeDetectorRef } from '@angular/core';
import { DeckCard } from '../../../../models/deck-card.model';
import { DeckCardRow } from '../../components/deck-card-row/deck-card-row';

@Component({
  selector: 'app-deck-details',
  imports: [DeckHeader, DeckCardRow],
  templateUrl: './deck-details.html',
  styleUrl: './deck-details.scss',
})
export class DeckDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly deckService = inject(DeckService);
  private readonly cardService = inject(CardService);
  private readonly cdr = inject(ChangeDetectorRef);

  deck?: Deck;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deck = this.deckService.getById(id);

    const txt = `2 Accursed Marauder
    2 Blood Fountain
    2 Bojuka Bog
    4 Cast Down

    2 Duress
    4 Relic of Progenitus`;

    this.deckService.importTxt(id, txt);

    this.deck = this.deckService.getById(id);

    this.loadCardImages();

  }

  private loadCardImages(): void {

    if (!this.deck) {
      return;
    }

    this.loadImages(this.deck.mainboard);
    this.loadImages(this.deck.sideboard);

  }

  private loadImages(cards: DeckCard[]): void {

    for (const deckCard of cards) {

      this.cardService.getByName(deckCard.name)
        .subscribe({

          next: card => {
            deckCard.card = card;
            this.cdr.detectChanges();
          },

          error: err => {
            console.error(`Erro ao buscar ${deckCard.name}`);
            console.error(err);
          }

        });

    }

  }

}
