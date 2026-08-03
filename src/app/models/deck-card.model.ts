import { Card } from "./card.model";

export interface DeckCard {
  id: number;
  quantity: number;
  name: string;

  card?: Card;
}