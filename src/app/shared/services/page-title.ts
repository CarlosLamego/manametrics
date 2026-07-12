import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageTitle {

  readonly title = signal('Dashboard');

  setTitle(title: string): void {
    this.title.set(title);
  }

}