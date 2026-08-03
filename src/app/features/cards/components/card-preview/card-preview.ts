import { Component, input } from '@angular/core';
import { Card } from '../../../../models/card.model';

@Component({
  selector: 'app-card-preview',
  imports: [],
  templateUrl: './card-preview.html',
  styleUrl: './card-preview.scss',
})
export class CardPreview {
  card = input.required<Card>();
}
