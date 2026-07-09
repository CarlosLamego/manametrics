import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Sidebar } from '../components/sidebar/sidebar';
import { Header } from '../components/header/header';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, Header, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
