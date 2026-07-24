import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private decks: Deck[] = [
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

  getAll(): Deck[] {
    return this.decks;
  }

  add(deck: Pick<Deck, 'name' | 'format'>): void {
    this.decks.push({
      id: this.decks.length + 1,
      name: deck.name,
      format: deck.format,
      colors: [],
      mainboard: [],
      sideboard: []
    });
  }

  getById(id: number): Deck | undefined {
    return this.decks.find(deck => deck.id === id);
  }

}