import { ajax } from 'rxjs/observable/dom/ajax';
import {AjaxObservable} from 'rxjs/observable/dom/AjaxObservable';
import {TASKBOARD_RENAME_REQUEST, TASKBOARD_DESCRIPTION_UPDATE_REQUEST,
        updateTaskBoardSuccess} from 'actions/task/task-wall';
import {makeApiUrl} from '../../utils/api';
import {Observable} from 'rxjs/Observable';
import {JWT_STORAGE_KEY} from '../../constants';
import {getJWT} from 'utils/auth';

function patchTaskBoard(boardId, data) {
  const header = {};
  header[JWT_STORAGE_KEY] = getJWT();
  return new AjaxObservable({method: 'PATCH', url: makeApiUrl(`/task-board/${boardId}`), body: data, headers: header});
}

export const updateTaskBoardDescription = action$ =>
  action$.ofType(TASKBOARD_DESCRIPTION_UPDATE_REQUEST)
  .distinctUntilChanged()
  .debounceTime(250)
  .mergeMap(action => {
    return patchTaskBoard(action.playload.boardId, {description: action.playload.description})
      .map(response => updateTaskBoardSuccess(response));
  }).catch((err, caught) => caught);

export const renameTaskBoard = action$ =>
  action$.ofType(TASKBOARD_RENAME_REQUEST)
  .distinctUntilChanged()
  .debounceTime(250)
  .mergeMap(action => {
    return patchTaskBoard(action.playload.boardId, {name: action.playload.name})
      .map(response => updateTaskBoardSuccess(response));
  }).catch((err, caught) => caught);
