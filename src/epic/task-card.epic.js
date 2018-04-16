import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';
import { AjaxObservable } from 'rxjs/observable/dom/AjaxObservable';
import { http } from '../services/http';
import { makeApiUrl } from '../utils/api';
import { Observable } from 'rxjs/Observable';
import { JWT_STORAGE_KEY } from '../constants';
import { getJWT } from 'utils/auth';
import Actions from '../actions/actions';

export const UPDATE_TASK_CARD_REQUEST = action$ =>
  action$
    .ofType(Actions.UPDATE_TASK_CARD.REQUEST)
    .distinctUntilChanged()
    .throttleTime(250)
    .mergeMap(action => {
      return http
        .patch(makeApiUrl(`/task-card/${action.payload.id}`), null, {
          id: action.payload.id,
          ...action.payload
        })
        .then(response => {
          return Actions.UPDATE_TASK_CARD.success(response, action.payload);
        })
        .catch(Actions.UPDATE_TASK_CARD.failure);
    });
