import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterDecrement, counterIncrement, counterReset } from '../store/items.action';

@Component({
  selector: 'counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  title: string;
  counter!: number;

  constructor(private store: Store<{counterReducer: number}>) {
    this.counter = 0;
    this.title = "Contador usando Redux, para manejar el estado";
    this.store.select('counterReducer').subscribe(result => {
      this.counter = result
    });
  }

  increment(): void {
    this.store.dispatch(counterIncrement({add: 2}));
  } 

  decrement(): void {
    this.store.dispatch(counterDecrement());
  }

  reset(): void {
    this.store.dispatch(counterReset());
  }
}
