import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { http } from '../services/http';
import { makeApiUrl } from '../utils/api';
import Actions from '../actions/actions';
import axios from 'axios';

export const UPDATE_TASK_CARD_REQUEST = action$ =>
  action$
    .ofType(Actions.UPDATE_TASK_CARD.REQUEST)
    .distinctUntilChanged()
    .debounceTime(1000)
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

export const DESTORY_TASK_CARD_REQUEST = action$ =>
  action$.ofType(Actions.DESTORY_TASK_CARD.REQUEST).mergeMap(action => {
    return axios
      .patch(makeApiUrl(`/task-card/${action.payload.id}`), {
        id: action.payload.id,
        status: 'DELETED'
      })
      .then(response => {
        return Actions.DESTORY_TASK_CARD.success(response.data);
      })
      .catch(Actions.DESTORY_TASK_CARD.failure);
  });

export const ARCHIVE_TASK_CARD_REQUEST = action$ =>
  action$.ofType(Actions.ARCHIVE_TASK_CARD.REQUEST).mergeMap(action => {
    return axios
      .patch(makeApiUrl(`/task-card/${action.payload.id}`), {
        id: action.payload.id,
        status: 'ARCHIVE'
      })
      .then(resp => Actions.ARCHIVE_TASK_CARD.success(resp.data))
      .catch(resp => Actions.ARCHIVE_TASK_CARD.success(resp.data));
  });
