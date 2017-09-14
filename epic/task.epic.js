import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { getCachedUserId } from 'utils/auth';

export const GET_TASK_BOARD = action$ =>
  action$.ofType(Actions.GET_TASK_BOARD.REQUEST).mergeMap(action => {
    return http
      .get(makeApiUrl(`/task-board/${action.playload.id}/verbose`), null)
      .then(Actions.GET_TASK_BOARD.success)
      .catch(Actions.GET_TASK_BOARD.failure);
  });

export const ADD_TASK_CARD = action$ =>
  action$.ofType(Actions.ADD_TASK_CARD.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl('/task-card'), null, action.playload)
      .then(Actions.ADD_TASK_CARD.success)
      .catch(Actions.ADD_TASK_CARD.failure);
  });

export const GET_TASK_ALL_BOARD = action$ =>
  action$.ofType(Actions.GET_TASK_ALL_BOARD.REQUEST).mergeMap(action => {
    const userId = getCachedUserId();
    return http
      .get(makeApiUrl(`/tk/user/${userId}/task-board`))
      .then(Actions.GET_TASK_ALL_BOARD.success)
      .catch(Actions.GET_TASK_ALL_BOARD.failure);
  });

export const UPDATE_TASK_CARD = action$ =>
  action$.ofType(Actions.UPDATE_TASK_CARD.REQUEST).mergeMap(action => {
    return http
      .patch(makeApiUrl(`/task-card/${action.playload.id}`), null, action.playload)
      .then(Actions.UPDATE_TASK_CARD.success)
      .catch(Actions.UPDATE_TASK_CARD.failure);
  });
