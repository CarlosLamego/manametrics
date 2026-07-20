import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Deck } from '../../../../models/deck.model';
import { DeckService } from '../../../../services/deck.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DeckDialog } from '../../components/deck-dialog/deck-dialog';

@Component({
  selector: 'app-decks',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './decks.html',
  styleUrl: './decks.scss',
})

export class Decks {
  private readonly deckService = inject(DeckService);
  private readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'name',
  ];

  dataSource: Deck[] = this.deckService.getAll();

  openDeckDialog(): void {
    const dialogRef = this.dialog.open(DeckDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.deckService.add(result);

      this.dataSource = this.deckService.getAll();
    });
  }
}