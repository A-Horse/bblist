import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import R from 'ramda';
import { getCachedUserId } from 'utils/auth';
import { Observable } from 'rxjs/Observable';

export const GET_TASK_BOARD = action$ =>
  action$.ofType(Actions.GET_TASK_BOARD.REQUEST).mergeMap(action => {
    return http
      .get(makeApiUrl(`/tk/task-board/${action.payload.id}/verbose`), null)
      .then(Actions.GET_TASK_BOARD.success)
      .catch(Actions.GET_TASK_BOARD.failure);
  });

export const ADD_TASK_BOARD_REQUEST = action$ =>
  action$.ofType(Actions.ADD_TASK_BOARD.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl(`/tk/task-board/`), null, action.payload)
      .then(Actions.ADD_TASK_BOARD.success)
      .catch(Actions.ADD_TASK_BOARD.failure);
  });

export const UPLOAD_TASK_BOARD_COVER_REQUEST = action$ =>
  action$.ofType(Actions.UPLOAD_TASK_BOARD_COVER.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl(`/tk/task-board/${action.payload.id}/cover`), null, action.payload.data, {
        formData: true
      })
      .then(Actions.UPLOAD_TASK_BOARD_COVER.success)
      .catch(Actions.UPLOAD_TASK_BOARD_COVER.failure);
  });

export const DESTORY_TASK_BOARD_REQUEST = action$ =>
  action$.ofType(Actions.DESTORY_TASK_BOARD.REQUEST).mergeMap(action => {
    return http
      .delete(makeApiUrl(`/tk/task-board/${action.payload.id}`), null)
      .then(response => Actions.DESTORY_TASK_BOARD.success(response, action.payload))
      .catch(Actions.DESTORY_TASK_BOARD.failure);
  });

export const UPDATE_TASK_BOARD_REQUEST = action$ =>
  action$
    .ofType(Actions.UPDATE_TASK_BOARD.REQUEST)
    .distinctUntilChanged()
    .debounceTime(1000)
    .mergeMap(action => {
      return http
        .patch(
          makeApiUrl(`/tk/task-board/${action.payload.id}`),
          null,
          R.omit(['id'], action.payload)
        )
        .then(Actions.UPDATE_TASK_BOARD.success)
        .catch(Actions.UPDATE_TASK_BOARD.failure);
    });

export const ADD_TASK_CARD = action$ =>
  action$.ofType(Actions.ADD_TASK_CARD.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl('/task-card'), null, action.payload)
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

/* export const UPDATE_TASK_CARD_SUCCESS = action$ =>
 *   action$.ofType(Actions.UPDATE_TASK_CARD.SUCCESS).mergeMap(action => {
 *     if (action.meta.taskListId) {
 *       return Observable.of(
 *         Actions.GET_TASK_BOARD.request({ id: action.payload.taskWallId }, { isRefresh: true })
 *       );
 *     }
 *     return Observable.of(Actions.UPDATE_TASK_CARD.finish());
 *   });*/

export const ADD_TASK_TRACK = action$ =>
  action$.ofType(Actions.ADD_TASK_TRACK.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl(`/task-board/${action.payload.boardId}/track`), null, action.payload)
      .then(Actions.ADD_TASK_TRACK.success)
      .catch(Actions.ADD_TASK_TRACK.failure);
  });

export const DESTORY_TASK_TRACK = action$ =>
  action$.ofType(Actions.DESTORY_TASK_TRACK.REQUEST).mergeMap(action => {
    return http
      .delete(makeApiUrl(`/task-board/${action.payload.boardId}/track/${action.payload.trackId}`))
      .then(() => Actions.DESTORY_TASK_TRACK.success(null, { ...action.payload }))
      .catch(Actions.DESTORY_TASK_TRACK.failure);
  });

export const UPDATE_TASK_TRACK_REQUEST = action$ =>
  action$
    .ofType(Actions.UPDATE_TASK_TRACK.REQUEST)
    .distinctUntilChanged()
    .debounceTime(250)
    .mergeMap(action => {
      return http
        .patch(
          makeApiUrl(`/task-board/${action.payload.boardId}/track/${action.payload.trackId}`),
          null,
          R.omit(['boardId', 'trackId'], action.payload)
        )
        .then(Actions.UPDATE_TASK_TRACK.success)
        .catch(Actions.UPDATE_TASK_TRACK.failure);
    });

export const UPDATE_TASK_TRACK_INDEX_REQUEST = action$ =>
  action$
    .ofType(Actions.UPDATE_TASK_TRACK_INDEX.REQUEST)
    .distinctUntilChanged()
    .debounceTime(250)
    .mergeMap(action => {
      return http
        .patch(makeApiUrl(`/task-board/${action.meta.boardId}/track/index`), null, action.payload)
        .then(Actions.UPDATE_TASK_TRACK_INDEX.success)
        .catch(Actions.UPDATE_TASK_TRACK_INDEX.failure);
    });

export const GET_CARD_DETAIL_REQUEST = action$ =>
  action$.ofType(Actions.GET_CARD_DETAIL.REQUEST).mergeMap(action => {
    return http
      .get(makeApiUrl(`/task-card/${action.payload.id}`))
      .then(Actions.GET_CARD_DETAIL.success)
      .catch(Actions.GET_CARD_DETAIL.failure);
  });

export const GET_TASK_BOARD_PARTICIPANT_REQUEST = action$ =>
  action$.ofType(Actions.GET_TASK_BOARD_PARTICIPANT.REQUEST).mergeMap(action => {
    return http
      .get(makeApiUrl(`/tk/task-board/${action.payload.id}/participant`))
      .then(Actions.GET_TASK_BOARD_PARTICIPANT.success)
      .catch(Actions.GET_TASK_BOARD_PARTICIPANT.failure);
  });

export const INVITE_TASK_BOARD_PARTICIPANT_REQUEST = action$ =>
  action$.ofType(Actions.INVITE_TASK_BOARD_PARTICIPANT.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl(`/tk/task-board/${action.payload.boardId}/invite`), null, action.payload)
      .then(Actions.INVITE_TASK_BOARD_PARTICIPANT.success)
      .catch(Actions.INVITE_TASK_BOARD_PARTICIPANT.failure);
  });
