//
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { AjaxObservable } from 'rxjs/observable/dom/AjaxObservable';
import { makeApiUrl } from '../utils/api';
import { JWT_STORAGE_KEY } from '../constants';
import { getJWT } from '../utils/auth';
import { ofType } from 'redux-observable';
import Actions from '../actions/actions';
import { mergeMap } from 'rxjs/operators';
import axios from 'axios';
import { Observable } from 'rxjs';

function patchTaskBoard(boardId, data) {
  const header = {};
  header[JWT_STORAGE_KEY] = getJWT();
  return new AjaxObservable({
    method: 'PATCH',
    url: makeApiUrl(`/task-board/${boardId}`),
    body: data,
    headers: header
  });
}

// export const TASKBOARD_DESCRIPTION_UPDATE_REQUEST = action$ =>
//   action$
//     .ofType(TASKBOARD_DESCRIPTION_UPDATE_REQUEST)
//     .distinctUntilChanged()
//     .debounceTime(250)
//     .mergeMap(action => {
//       return patchTaskBoard(action.payload.boardId, {
//         description: action.payload.description
//       }).map(response => updateTaskBoardSuccess(response));
//     })
//     .catch((err, caught) => caught);

export const TASKBOARD_SETTING_UPDATE_REQUEST = action$ =>
  action$.pipe(
    ofType(Actions.TASKBOARD_SETTING_UPDATE.REQUEST),
    mergeMap(action => {
      return axios
        .patch(`/api/task-board/${action.meta.taskBoardId}/setting`, action.payload)
        .then(resp => Actions.TASKBOARD_SETTING_UPDATE.success(resp.data, action.meta))
        .catch(Actions.TASKBOARD_SETTING_UPDATE.failure);
    })
  );

export const GET_TASK_BOARD_SETTING_REQUEST = action$ =>
  action$.pipe(
    ofType(Actions.GET_TASK_BOARD_SETTING.REQUEST),
    mergeMap(action => {
      return axios
        .get(`/api/task-board/${action.payload.taskBoardId}/setting`)
        .then(resp => Actions.GET_TASK_BOARD_SETTING.success(resp.data))
        .catch(Actions.GET_TASK_BOARD_SETTING.failure);
    })
  );
