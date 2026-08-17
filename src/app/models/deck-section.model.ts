import { DeckCard } from './deck-card.model';

export interface DeckSection {
  title: string;
  totalCards: number;
  cards: DeckCard[];
}