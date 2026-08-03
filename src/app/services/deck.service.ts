import { inject, Injectable } from '@angular/core';
import { ImportTxtService } from './import-txt.service';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private readonly _importTxtService = inject(ImportTxtService);
  private readonly _storageKey = 'manametrics.decks';
  private _decks: Deck[] = [];

  constructor() {
    this._load();
  }


  getAll(): Deck[] {
    return this._decks;
  }

  add(deck: Pick<Deck, 'name' | 'format'>): void {
    this._decks.push({
      id: this._decks.length + 1,
      name: deck.name,
      format: deck.format,
      colors: [],
      mainboard: [],
      sideboard: []
    });
  }

  getById(id: number): Deck | undefined {
    return this._decks.find(deck => deck.id === id);
  }

  importTxt(id: number, txt: string): void {
    const deck = this.getById(id);
    if (!deck) {
      return;
    }
    const importedDeck = this._importTxtService.import(txt);
    deck.mainboard = importedDeck.mainboard;
    deck.sideboard = importedDeck.sideboard;
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
      JSON.stringify(this._decks)
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