// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { getCachedUserId } from 'utils/auth';

export const ADD_TODO_REQUEST = action$ =>
  action$.ofType(Actions.ADD_TODO.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl('/todo'), null, action.playload)
      .then(Actions.ADD_TODO.success)
      .catch(Actions.ADD_TODO.failure);
  });

export const ADD_TODOBOX_REQUEST = action$ =>
  action$.ofType(Actions.ADD_TODOBOX.REQUEST).mergeMap(action => {
    return http
      .post(makeApiUrl('/t/todo-box'), null, action.playload)
      .then(Actions.ADD_TODOBOX.success)
      .catch(Actions.ADD_TODOBOX.failure);
  });

export const GET_TODOLIST_REQUEST = action$ =>
  action$.ofType(Actions.GET_TODOLIST.REQUEST).mergeMap(action => {
    const userId = getCachedUserId();
    const url = action.playload.todoBoxId
      ? `/t/todo-box/${action.playload.todoBoxId}`
      : `/user/${userId}/todo`;

    return http
      .get(makeApiUrl(url))
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

export const DESTORY_TODO = action$ =>
  action$.ofType(Actions.DESTORY_TODO.REQUEST).mergeMap(action => {
    const { id } = action.playload;
    return http
      .delete(makeApiUrl(`/todo/${id}`))
      .then(() => {
        return Actions.DESTORY_TODO.success(null, { id: action.playload.ideas });
      })
      .catch(Actions.DESTORY_TODO.failure);
  });

export const GET_TODOBOXS_REQUEST = actions$ =>
  actions$.ofType(Actions.GET_TODOBOXS.REQUEST).mergeMap(() => {
    const userId = getCachedUserId();
    return http
      .get(makeApiUrl(`/t/user/${userId}/todo-box`))
      .then(Actions.GET_TODOBOXS.success)
      .catch(Actions.GET_TODOBOXS.failure);
  });
