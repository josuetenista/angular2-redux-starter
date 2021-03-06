import { Component, Inject, ApplicationRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { bindActionCreators } from 'redux';
import { select } from 'ng2-redux';
import { CounterActions } from '../actions/counter';
import { Observable } from 'rxjs/Observable';
import { RioContainer, RioCounter } from '../components';

@Component({
  selector: 'counter-page',
  providers: [ CounterActions ],
  directives: [ RioContainer, RioCounter ],
  pipes: [ AsyncPipe ],
  template: `
    <rio-container testid="counter" [size]=2 [center]=true>
      <h2 data-testid="counter-heading" id="qa-counter-heading"
        class="center caps">
        Counter
      </h2>

      <rio-counter
        [counter]="counter$ | async"
        (increment)="actions.increment()"
        (decrement)="actions.decrement()">
      </rio-counter>
    </rio-container>
  `
})
export class RioCounterPage {
  @select(s => s.counter.get('count')) private counter$: Observable<number>;

  constructor(private actions: CounterActions) {}
}
