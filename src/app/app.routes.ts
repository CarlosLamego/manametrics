import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Decks } from './features/decks/pages/decks/decks';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { DeckDetails } from './features/decks/pages/deck-details/deck-details';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Dashboard,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'decks',
        component: Decks,
        data: {
          title: 'Decks'
        }
      },
      {
        path: 'decks/:id',
        component: DeckDetails,
        data: {
          title: 'Deck Details'
        }
      }
    ]
  }

];