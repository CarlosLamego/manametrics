import { inject, Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { DeckBuilderService } from './deck-builder.service';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private readonly _deckBuilderService = inject(DeckBuilderService);
  private readonly _storageKey = 'manametrics.decks';
  private _decks: Deck[] = [];
  private readonly _cardService = inject(CardService);

  constructor() {
    this._load();
  }

  getAll(): Deck[] {
    return this._decks;
  }

  add(deck: {
    name: string;
    format: string;
    decklist?: string;
  }): void {

    this._decks.push(this._createDeck(deck));
    this._save();
  }

  update(
    id: number,
    deckData: {
      name: string;
      format: string;
      decklist?: string;
    }
  ): void {
    const deck = this.getById(id);
    if (!deck) {
      return;
    }
    deck.name = deckData.name;
    deck.format = deckData.format;
    if (deckData.decklist?.trim()) {
      const importedDeck =
        this._deckBuilderService.build(deckData.decklist);
      deck.mainboard = importedDeck.mainboard;
      deck.sideboard = importedDeck.sideboard;
    } else {
      deck.mainboard = [];
      deck.sideboard = [];
    }
    this._updateDeckColors(deck);
    this._save();
  }

  private _createDeck(deck: {
    name: string;
    format: string;
    decklist?: string;
  }): Deck {

    const newDeck: Deck = {
      id: this._decks.length + 1,
      name: deck.name,
      format: deck.format,
      colors: [],
      mainboard: [],
      sideboard: []
    };

    if (deck.decklist?.trim()) {
      const importedDeck = this._deckBuilderService.build(deck.decklist);

      newDeck.mainboard = importedDeck.mainboard;
      newDeck.sideboard = importedDeck.sideboard;
    }

    return newDeck;
  }

  getById(id: number): Deck | undefined {
    return this._decks.find(deck => deck.id === id);
  }

  private _sanitizeDecks(): Deck[] {

    return this._decks.map(deck => ({

      ...deck,

      mainboard: deck.mainboard.map(deckCard => ({
        quantity: deckCard.quantity,
        name: deckCard.name
      })),

      sideboard: deck.sideboard.map(deckCard => ({
        quantity: deckCard.quantity,
        name: deckCard.name
      }))

    }));

  }

  save(): void {
    this._save();
  }

  importTxt(id: number, txt: string): void {
    const deck = this.getById(id);
    if (!deck) {
      return;
    }
    const importedDeck = this._deckBuilderService.build(txt);
    deck.mainboard = importedDeck.mainboard;
    deck.sideboard = importedDeck.sideboard;
    this._updateDeckColors(deck);
    this._save();
  }

  private _updateDeckColors(deck: Deck): void {
    for (const deckCard of deck.mainboard) {
      deckCard.card = this._cardService.getCached(deckCard.name);
    }

    deck.colors = this._deckBuilderService.calculateColors(deck);
  }

  private _load(): void {
    const data = localStorage.getItem(this._storageKey);
    if (!data) {
      this._decks = this._createDefaultDecks();
      this._save();
      return;
    }
    this._decks = JSON.parse(data);
  }

  private _save(): void {
    localStorage.setItem(
      this._storageKey,
      JSON.stringify(this._sanitizeDecks())
    );
  }


  private _createDefaultDecks(): Deck[] {
    return [
      {
        id: 1,
        name: 'Izzet Phoenix',
        format: 'Pioneer',
        colors: ['Blue', 'Red'],
        mainboard: [],
        sideboard: []
      },
      {
        id: 2,
        name: 'Mono Green Devotion',
        format: 'Pioneer',
        colors: ['Green'],
        mainboard: [],
        sideboard: []
      },
      {
        id: 3,
        name: 'Azorius Control',
        format: 'Pioneer',
        colors: ['White', 'Blue'],
        mainboard: [],
        sideboard: []
      }
    ];
  }
}