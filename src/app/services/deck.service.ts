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
      colors: ['Blue', 'Red']
    },
    {
      id: 2,
      name: 'Mono Green Devotion',
      format: 'Pioneer',
      colors: ['Green']
    },
    {
      id: 3,
      name: 'Azorius Control',
      format: 'Pioneer',
      colors: ['White', 'Blue']
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
      colors: []
    });
  }

}