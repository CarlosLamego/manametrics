import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deck } from '../../../../models/deck.model';
import { DeckService } from '../../../../services/deck.service';
import { DeckHeader } from '../../components/deck-header/deck-header';
import { CardService } from '../../../../services/card.service';
import { ChangeDetectorRef } from '@angular/core';
import { DeckCard } from '../../../../models/deck-card.model';
import { DeckCardRow } from '../../components/deck-card-row/deck-card-row';
import { MatDialog } from '@angular/material/dialog';
import { DeckDialog } from '../../components/deck-dialog/deck-dialog';
import { DeckBuilderService } from '../../../../services/deck-builder.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeckAnalysisService } from '../../../../services/deck-analysis.service';
import { DeckStats } from '../../../../models/deck-stats.model';
import { DeckStatsComponent } from '../../components/deck-stats/deck-stats';
import { DeckSection } from '../../../../models/deck-section.model';

@Component({
  selector: 'app-deck-details',
  imports: [DeckHeader, DeckCardRow, DeckStatsComponent, DeckDialog],
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
  private readonly _deckAnalysisService = inject(DeckAnalysisService);

  deck?: Deck;
  stats?: DeckStats;
  sections: DeckSection[] = [];

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
            if (card) {
              deckCard.card = card;
              deckCard.notFound = false;
            } else {
              deckCard.notFound = true;
            }
            return card;
          })
        )
      )
    ).subscribe({
      next: () => {
        this.updateDeckColors();
        this._updateAnalysis();
        console.log(this.stats);
        this._cdr.detectChanges();
      },
      error: err => {
        console.error(err);
      }
    });
  }
  openEditDialog(): void {
    if (!this.deck) {
      return;
    }
    const dialogRef = this._dialog.open(DeckDialog, {
      width: '700px',
      data: this.deck
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result || !this.deck) {
        return;
      }
      this._deckService.update(this.deck.id, result);
      this.deck = this._deckService.getById(this.deck.id);
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
  private _updateAnalysis(): void {
    if (!this.deck) {
      return;
    }
    this.stats = this._deckAnalysisService.calculateStats(this.deck);
    this.sections = this._deckAnalysisService.calculateSections(this.deck);
    console.log('Sections:', this.sections);
  }
  exportDeck(): void {
    if (!this.deck) {
      return;
    }

    const txt = this._deckBuilderService.toTxt(this.deck);

    const blob = new Blob([txt], {
      type: 'text/plain;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.deck.name}.txt`;

    link.click();

    URL.revokeObjectURL(url);
  }

}
