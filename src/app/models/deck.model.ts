import { DeckCard } from './deck-card.model';

export interface Deck {

  id: number;

  name: string;

  format: string;

  colors: string[];

  mainboard: DeckCard[];

  sideboard: DeckCard[];

}