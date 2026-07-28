import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    private readonly http = inject(HttpClient);

getByName(name: string) {
  return this.http
    .get<any>(
      `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
    )
    .pipe(
      map(card => ({
        name: card.name,
        manaCost: card.mana_cost,
        type: card.type_line,
        oracleText: card.oracle_text,
        image: card.image_uris.normal,
        colors: card.colors
      } as Card))
    );
}

}