import { ajax } from 'rxjs/observable/dom/ajax';
import {AjaxObservable} from 'rxjs/observable/dom/AjaxObservable';

import {TASKBOARD_RENAME_REQUEST, updateTaskBoardSuccess} from 'actions/task/task-wall';
import {makeApiUrl} from '../../utils/api';
import {Observable} from 'rxjs/Observable';

function patchTaskBoard(boardId, data) {
  return new AjaxObservable({method: 'PATCH', url: `/task-board/${boardId}`, body: data});
}

export const renameTaskBoard = action$ =>
  action$.ofType(TASKBOARD_RENAME_REQUEST)
  .distinctUntilChanged()
  .debounceTime(250)
  .mergeMap(action => {
    return patchTaskBoard(action.playload.boardId, {name: action.playload.name})
      .map(response => updateTaskBoardSuccess(response));
  }).catch((err, caught) => caught);
