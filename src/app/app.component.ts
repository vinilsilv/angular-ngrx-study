import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { decrementaContador, IAppState, incrementaContador } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  constructor(private store: Store<{ app: IAppState }>){}

  counter$ = this.store
  .select('app')
  .pipe(
    map( e => e.counter)
  )
  ;

  incrementaContador() {
    this.store.dispatch(incrementaContador())
  }

  decrementaContador() {
    this.store.dispatch(decrementaContador())
  }
}