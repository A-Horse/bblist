import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';
import { AjaxObservable } from 'rxjs/observable/dom/AjaxObservable';
import { updateTaskBoardSuccess } from 'actions/task/task-wall';
import { makeApiUrl } from '../utils/api';
import { Observable } from 'rxjs/Observable';
import { JWT_STORAGE_KEY } from '../constants';
import { getJWT } from 'utils/auth';

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

export const TASKBOARD_DESCRIPTION_UPDATE_REQUEST = action$ =>
  action$
    .ofType(TASKBOARD_DESCRIPTION_UPDATE_REQUEST)
    .distinctUntilChanged()
    .debounceTime(250)
    .mergeMap(action => {
      return patchTaskBoard(action.payload.boardId, {
        description: action.payload.description
      }).map(response => updateTaskBoardSuccess(response));
    })
    .catch((err, caught) => caught);
