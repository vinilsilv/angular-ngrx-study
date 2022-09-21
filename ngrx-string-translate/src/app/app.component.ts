import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

interface AppState {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.message$ = this.store.select('message')
  }

  spanishMessage() {
    this.store.dispatch({type: 'SPANISH'})
  }

  portugueseMessage() {
    this.store.dispatch({type: 'PORTUGUESE'})
  }
}
