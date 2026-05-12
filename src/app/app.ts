import { Component, signal } from '@angular/core';
import { Auth } from './services/auth/auth';
import { Login } from './pages/login/login';
import { Layout } from './services/layout/layout';
import { Main } from './pages/main/main';

@Component({
  selector: 'app-root',
  imports: [Login, Main],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('data-on-app');

  public constructor(public auth: Auth, public layout: Layout) { }
}
