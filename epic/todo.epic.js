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

export const ADD_TODO = action$ =>
  action$.ofType(Actions.ADD_TODO.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl('/todo'), null, action.playload)
      .then(Actions.ADD_TODO.success)
      .catch(Actions.ADD_TODO.failure);
  });

export const GET_TODOLIST = action$ =>
  action$.ofType(Actions.GET_TODOLIST.REQUEST).mergeMap(action => {
    const userId = getCachedUserId();
    return http
      .get(makeApiUrl(`/user/${userId}/todo`))
      .then(Actions.GET_TODOLIST.success)
      .catch(Actions.GET_TODOLIST.failure);
  });

export const UPDATE_TODO = action$ =>
  action$.ofType(Actions.UPDATE_TODO.REQUEST).mergeMap(action => {
    const { id } = action.playload;
    return http
      .patch(makeApiUrl(`/todo/${id}`), null, action.playload)
      .then(Actions.UPDATE_TODO.success)
      .catch(Actions.UPDATE_TODO.failure);
  });
