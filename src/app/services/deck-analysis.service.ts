import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { DeckStats } from '../models/deck-stats.model';
import { DeckSection } from '../models/deck-section.model';

@Injectable({
  providedIn: 'root'
})
export class DeckAnalysisService {

  calculateStats(deck: Deck): DeckStats {

    const stats: DeckStats = {
      totalCards: 0,
      creatures: 0,
      instants: 0,
      sorceries: 0,
      artifacts: 0,
      enchantments: 0,
      planeswalkers: 0,
      lands: 0
    };

    for (const deckCard of deck.mainboard) {

      const quantity = deckCard.quantity;
      const type = deckCard.card?.type ?? '';

      stats.totalCards += quantity;

      if (type.includes('Creature')) {
        stats.creatures += quantity;
      }

      if (type.includes('Instant')) {
        stats.instants += quantity;
      }

      if (type.includes('Sorcery')) {
        stats.sorceries += quantity;
      }

      if (type.includes('Artifact')) {
        stats.artifacts += quantity;
      }

      if (type.includes('Enchantment')) {
        stats.enchantments += quantity;
      }

      if (type.includes('Planeswalker')) {
        stats.planeswalkers += quantity;
      }

      if (type.includes('Land')) {
        stats.lands += quantity;
      }

    }
    return stats;
  }
  calculateSections(deck: Deck): DeckSection[] {
    const sections: DeckSection[] = [
      { title: 'Criaturas', totalCards: 0, cards: [] },
      { title: 'Instantâneas', totalCards: 0, cards: [] },
      { title: 'Feitiços', totalCards: 0, cards: [] },
      { title: 'Artefatos', totalCards: 0, cards: [] },
      { title: 'Encantamentos', totalCards: 0, cards: [] },
      { title: 'Planeswalkers', totalCards: 0, cards: [] },
      { title: 'Terrenos', totalCards: 0, cards: [] }
    ];

    for (const deckCard of deck.mainboard) {
      const type = deckCard.card?.type ?? '';

      let section: DeckSection | undefined;

      if (type.includes('Creature')) {
        section = sections[0];
      } else if (type.includes('Instant')) {
        section = sections[1];
      } else if (type.includes('Sorcery')) {
        section = sections[2];
      } else if (type.includes('Artifact')) {
        section = sections[3];
      } else if (type.includes('Enchantment')) {
        section = sections[4];
      } else if (type.includes('Planeswalker')) {
        section = sections[5];
      } else if (type.includes('Land')) {
        section = sections[6];
      }

      if (!section) {
        continue;
      }

      section.cards.push(deckCard);
      section.totalCards += deckCard.quantity;
    }

    return sections.filter(section => section.cards.length > 0);
  }

}