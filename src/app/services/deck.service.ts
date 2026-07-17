import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  getAll(): Deck[] {

    return [
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

  }

}