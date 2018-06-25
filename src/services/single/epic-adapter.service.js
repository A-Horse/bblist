// @flow

import { Observable } from 'rxjs';
import type { ActionsObservable } from 'redux-observable';

import 'rxjs/add/operator/publish';

export class EpicAdapterService {
  input$: ActionsObservable<FSAction>;

  input(input$: ActionsObservable<FSAction>): ActionsObservable<FSAction> {
    this.input$ = input$.publish();
    this.input$.connect();
    return input$;
  }

  output(output: Observable<any>): Observable<any> {
    return output;
  }
}

export default new EpicAdapterService();
