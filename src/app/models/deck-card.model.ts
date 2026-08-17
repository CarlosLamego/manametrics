import { Card } from "./card.model";

export interface DeckCard {
  quantity: number;
  name: string;
  card?: Card;
  notFound?: boolean;
}