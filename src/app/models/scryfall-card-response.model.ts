export interface ScryfallCardResponse {
  name: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  colors: string[];
  image_uris: {
    normal: string;
  };
}