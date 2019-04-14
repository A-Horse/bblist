import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { http } from '../services/http';
import { makeApiUrl } from '../utils/api';
import Actions from '../actions/actions';
import axios from 'axios';

export const ADD_TASK_CARD = (action$: any) =>
  action$.ofType(Actions.ADD_TASK_CARD.REQUEST).mergeMap((action: any) => {
    return http
      .post(makeApiUrl('/v2/task-card'), null, action.payload)
      .then((createdCard: any) => {
        return Actions.ADD_TASK_CARD.success(createdCard, {
          trackId: action.payload.trackId
        })
      })
      .catch(Actions.ADD_TASK_CARD.failure);
  });

export const UPDATE_TASK_CARD_REQUEST = (action$: any) =>
  action$
    .ofType(Actions.UPDATE_TASK_CARD.REQUEST)
    .distinctUntilChanged()
    .debounceTime(1000)
    .mergeMap((action: any) => {
      return http
        .patch(makeApiUrl(`/task-card/${action.payload.id}`), null, {
          id: action.payload.id,
          ...action.payload
        })
        .then((response: any) => {
          return Actions.UPDATE_TASK_CARD.success(response, action.payload);
        })
        .catch(Actions.UPDATE_TASK_CARD.failure);
    });

export const DESTORY_TASK_CARD_REQUEST = (action$: any) =>
  action$.ofType(Actions.DESTORY_TASK_CARD.REQUEST).mergeMap((action: any) => {
    return axios
      .patch(makeApiUrl(`/task-card/${action.payload.id}`), {
        id: action.payload.id,
        status: 'DELETED'
      })
      .then(response => {
        return Actions.DESTORY_TASK_CARD.success({ id: action.payload.id });
      })
      .catch(Actions.DESTORY_TASK_CARD.failure);
  });

export const ARCHIVE_TASK_CARD_REQUEST = (action$: any) =>
  action$.ofType(Actions.ARCHIVE_TASK_CARD.REQUEST).mergeMap((action: any) => {
    return axios
      .patch(makeApiUrl(`/task-card/${action.payload.id}`), {
        id: action.payload.id,
        status: 'ARCHIVE'
      })
      .then(() => Actions.ARCHIVE_TASK_CARD.success({ id: action.payload.id }))
      .catch(resp => Actions.ARCHIVE_TASK_CARD.failure(resp.data));
  });
