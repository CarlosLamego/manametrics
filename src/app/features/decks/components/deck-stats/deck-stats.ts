import { Component, input } from '@angular/core';
import { DeckStats } from '../../../../models/deck-stats.model';

@Component({
  selector: 'app-deck-stats',
  imports: [],
  templateUrl: './deck-stats.html',
  styleUrl: './deck-stats.scss',
})
export class DeckStatsComponent {
  stats = input.required<DeckStats>();
}