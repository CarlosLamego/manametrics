import { Injectable } from '@angular/core';
import { DeckCard } from '../models/deck-card.model';

@Injectable({
    providedIn: 'root'
})
export class ImportTxtService {
    import(deckList: string): {
        mainboard: DeckCard[];
        sideboard: DeckCard[];
    } {
        const lines = deckList
            .split('\n')
            .map(line => line.trim());

        const mainboard: DeckCard[] = [];
        const sideboard: DeckCard[] = [];

        let readingMainboard = true;
        for (const line of lines) {
            if (line === '') {
                readingMainboard = false;
            } else {
                const card = this.parseLine(line);
                if (readingMainboard) {
                    mainboard.push(card);
                } else {
                    sideboard.push(card);
                }
            }
        }
        return {
            mainboard,
            sideboard
        };
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