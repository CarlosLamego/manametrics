export type CardColor = 'W' | 'U' | 'B' | 'R' | 'G';

export interface Card {
  name: string;
  manaCost: string;
  type: string;
  oracleText: string;
  image: string;
  colors: CardColor[];
}