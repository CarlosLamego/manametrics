import { Injectable } from '@angular/core';
import { DeckCard } from '../models/deck-card.model';

@Injectable({
    providedIn: 'root'
})
export class ImportTxtService {
import(deckList: string): void {

  const card = this.parseLine('2 Blood Fountain');

  console.log(card);

}

    private parseLine(line: string): DeckCard {
        const parts = line.split(' ');
        const quantity = Number(parts[0]);
        const name = parts.slice(1).join(' ');
        return {
            id: 0,
            quantity,
            name
        };

    }
}