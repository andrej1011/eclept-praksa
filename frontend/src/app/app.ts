import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header></app-header>
    <main class="content"><router-outlet></router-outlet></main>
    <app-footer></app-footer>
  `,
  styles: `
    :host { display: flex; flex-direction: column; min-height: 100vh; }
    .content { flex: 1; }
  `,
})
export class App {}