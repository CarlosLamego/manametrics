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
import { MatDialog } from '@angular/material/dialog';
import { ImportDeckDialog } from '../../components/import-deck-dialog/import-deck-dialog';
import { DeckBuilderService } from '../../../../services/deck-builder.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-deck-details',
  imports: [DeckHeader, DeckCardRow],
  templateUrl: './deck-details.html',
  styleUrl: './deck-details.scss',
})
export class DeckDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly _deckService = inject(DeckService);
  private readonly _cardService = inject(CardService);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _dialog = inject(MatDialog);
  private readonly _deckBuilderService = inject(DeckBuilderService);

  deck?: Deck;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deck = this._deckService.getById(id);
    this.loadCardImages();
  }

  private loadCardImages(): void {

    if (!this.deck) {
      return;
    }
    const cards = [
      ...this.deck.mainboard,
      ...this.deck.sideboard
    ];

    if (cards.length === 0) {
      return;
    }
    this.loadImages(cards);
  }

  private loadImages(cards: DeckCard[]): void {
    forkJoin(
      cards.map(deckCard =>
        this._cardService.getByName(deckCard.name).pipe(
          map(card => {
            deckCard.card = card;
            return card;
          })
        )
      )
    ).subscribe({
      next: () => {
        this.updateDeckColors();
        this._cdr.detectChanges();
      },
      error: err => {
        console.error(err);
      }
    });
  }
  openImportDialog(): void {
    const dialogRef = this._dialog.open(ImportDeckDialog, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result || !this.deck) {
        return;
      }
      this._deckService.importTxt(this.deck.id, result);
      this.loadCardImages();

    });
  }
  private updateDeckColors(): void {

    if (!this.deck) {
      return;
    }

    this.deck.colors =
      this._deckBuilderService.calculateColors(this.deck);

    this._deckService.save();

    this._cdr.detectChanges();

  }

}
