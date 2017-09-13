import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Storage } from '../services/storage';
import Actions from '../actions/actions';
import { ajax } from 'rxjs/observable/dom/ajax';
import fetch from 'isomorphic-fetch';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';
import { getJWT } from '../utils/auth';
import { saveAuthData, saveJWT } from 'utils/auth';
import { getCachedUserId } from 'utils/auth';

export const GET_TASK_BOARD = action$ =>
  action$.ofType(Actions.GET_TASK_BOARD.REQUEST).mergeMap(action => {
    return http
      .get(makeApiUrl(`/task-board/${action.playload.id}/verbose`), null)
      .then(Actions.GET_TASK_BOARD.success)
      .catch(Actions.GET_TASK_BOARD.failure);
  });
