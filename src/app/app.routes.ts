import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Decks } from './features/decks/pages/decks/decks';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Dashboard
      },
      {
        path: 'decks',
        component: Decks
      }
    ]
  }
];