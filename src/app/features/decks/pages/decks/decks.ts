import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Deck } from '../../../../models/deck.model';
import { DeckService } from '../../../../services/deck.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DeckDialog } from '../../components/deck-dialog/deck-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-decks',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule
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

  dataSource = new MatTableDataSource<Deck>(this.deckService.getAll());
  openDeckDialog(): void {
    const dialogRef = this.dialog.open(DeckDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      console.log('Recebido:', result);

      this.deckService.add(result);

      console.log('Service:', this.deckService.getAll());

      this.dataSource.data = this.deckService.getAll();
      console.log('DataSource:', this.dataSource);

      this.snackBar.open(
        'Deck cadastrado com sucesso!',
        'Fechar',
        {
          duration: 3000
        }
      );
    });
  }

  private readonly snackBar = inject(MatSnackBar);
}