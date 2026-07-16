import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'; 

@Component({
  selector: 'app-decks',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule, 
    MatTableModule
  ],
  templateUrl: './decks.html',
  styleUrl: './decks.scss',
})

export class Decks {

  displayedColumns: string[] = [
    'name',
  ];

dataSource = [
  {
    name: 'Izzet Phoenix',
    format: 'Pioneer',
    colors: '🔵🔴'
  },
  {
    name: 'Mono Green Devotion',
    format: 'Pioneer',
    colors: '🟢'
  },
  {
    name: 'Azorius Control',
    format: 'Pioneer',
    colors: '⚪🔵'
  }
];
}