import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import R from 'ramda';
import { Observable } from 'rxjs/Observable';

export const GET_TASK_TRACK_CARD_REQUEST = action$ =>
  action$.ofType(Actions.GET_TASK_TRACK_CARD.REQUEST).mergeMap(action => {
    return http
      .get(makeApiUrl(`/task-board/${action.payload.boardId}/track/${action.payload.trackId}/card`))
      .then(Actions.GET_TASK_TRACK_CARD.success)
      .catch(Actions.GET_TASK_TRACK_CARD.failure);
  });
