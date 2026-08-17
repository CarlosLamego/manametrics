import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Card, CardColor } from '../models/card.model';
import { ScryfallCardResponse } from '../models/scryfall-card-response.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly _http = inject(HttpClient);
  private readonly _cards = new Map<string, Card>();

  getByName(name: string) {

    const key = name.toLowerCase();

    const cachedCard = this._cards.get(key);

    if (cachedCard) {
      console.log('CACHE:', name);
      return of(cachedCard);
    }

    console.log('SCRYFALL:', name);

    return this._http
      .get<ScryfallCardResponse>(
        `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
      )
      .pipe(
        map(card => {

          const mappedCard: Card = {
            name: card.name,
            manaCost: card.mana_cost,
            type: card.type_line,
            oracleText: card.oracle_text,
            image: card.image_uris.normal,
            colors: (card.colors ?? []) as CardColor[]
          };

          this._cards.set(key, mappedCard);

          return mappedCard;
        }),

        catchError(() => {
          console.warn('CARTA NÃO ENCONTRADA:', name);
          return of(null);
        })
      );
  }

  getCached(name: string): Card | undefined {
    return this._cards.get(name.toLowerCase());
  }

}