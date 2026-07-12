import { Component, inject } from '@angular/core';
import { PageTitle } from '../../../shared/services/page-title';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  readonly pageTitle = inject(PageTitle);

}