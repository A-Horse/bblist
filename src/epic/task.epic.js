import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import * as R from 'ramda';
import { getCachedUserId } from '../utils/auth';
import { fromJS } from 'immutable';


export const CARD_MOVE_REQUEST = (action$, state) =>
  action$.ofType(Actions.CARD_MOVE.REQUEST).map(action => {
    const sourceUdpatedCards = state.value.task2
      .get('cardMap')
      .filter(card => {
        return (
          card.get('taskTrackId') === action.payload.sourceCard.taskTrackId &&
          card.get('index') > action.payload.sourceCard.index
        );
      })
      .map(card => {
        return card.update('index', i => i - 1);
      });

    const targetUdpatedCards = state.value.task2
      .get('cardMap')
      .filter(card => {
        return (
          card.get('taskTrackId') === action.payload.targetCard.taskTrackId &&
          card.get('index') > action.payload.targetCard.index
        );
      })
      .map(card => {
        return card.update('index', i => i + 1);
      });

    const mergedCards = sourceUdpatedCards.merge(targetUdpatedCards);

    const resultUpdatedCards = mergedCards.set(
      action.payload.sourceCard.id.toString(),
      fromJS({
        ...action.payload.sourceCard,
        taskTrackId: action.payload.targetCard.taskTrackId,
        index:
          state.value.task2
            .get('cardMap')
            .merge(mergedCards)
            .find(card => card.get('id') === action.payload.targetCard.id)
            .get('index') + 1
      })
    );

    return Actions.CARD_MOVE_HANDLE.request(resultUpdatedCards);
  });

export const CARD_MOVE_HANDLE_REQUEST = action$ =>
  action$.ofType(Actions.CARD_MOVE_HANDLE.REQUEST).mergeMap(action => {
    return http
      .patch(makeApiUrl(`/task-cards/move-batch`), null, action.payload)
      .then(Actions.CARD_MOVE_HANDLE.success)
      .catch(Actions.CARD_MOVE_HANDLE.failure);
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
    .debounceTime(300)
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

export const GET_USER_TASK_ALL_BOARD = action$ =>
  action$.ofType(Actions.GET_TASK_ALL_BOARD.REQUEST).mergeMap(action => {
    const userId = getCachedUserId();
    return http
      .get(makeApiUrl(`/tk/v2/user/${userId}/task-board`))
      .then(Actions.GET_TASK_ALL_BOARD.success)
      .catch(Actions.GET_TASK_ALL_BOARD.failure);
  });

export const ADD_TASK_TRACK = action$ =>
  action$.ofType(Actions.ADD_TASK_TRACK.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl(`/v2/task-board/${action.payload.boardId}/track`), null, action.payload)
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
