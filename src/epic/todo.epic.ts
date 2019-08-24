import { message } from 'antd';
import { ofType } from 'redux-observable';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

import Actions from '../actions/actions';
import { http } from '../services/http';
import { makeApiUrl } from '../utils/api';
import { getCachedUserId } from '../utils/auth';

export const ADD_TODO_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.ADD_TODO.REQUEST),
    mergeMap((action: any) => {
      return http
        .post(makeApiUrl('/t/todo'), null, action.payload)
        .then((resp: any) => {
          message.success('Add todo success');
          if (action.meta && action.meta.closeFn) {
            action.meta.closeFn();
          }
          return Actions.ADD_TODO.success(resp);
        })
        .catch(Actions.ADD_TODO.failure);
    })
  );

export const ADD_TODOBOX_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.ADD_TODOBOX.REQUEST),
    mergeMap((action: any) => {
      return http
        .post(makeApiUrl('/t/todo-box'), null, action.payload)
        .then(Actions.ADD_TODOBOX.success)
        .catch(Actions.ADD_TODOBOX.failure);
    })
  );

export const GET_TODOLIST_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.GET_TODOLIST.REQUEST),
    mergeMap((action: any) => {
      const userId = getCachedUserId();
      let url;
      switch (action.payload.todoBoxId) {
        case '@all':
          url = `/t/user/${userId}/todo`;
          break;
        case '@task':
          url = `/t/user/${userId}/task-todo`;
          break;
        default:
          url = `/t/todo-box/${action.payload.todoBoxId}`;
          break;
      }

      return http
        .get(makeApiUrl(url))
        .then((data: any) => {
          return Actions.GET_TODOLIST.success(
            (data || []).map((todo: any) => {
              return todo.todoBoxId ? todo : { ...todo, todoBoxId: action.payload.todoBoxId };
            })
          );
        })
        .catch(Actions.GET_TODOLIST.failure);
    })
  );

export const UPDATE_TODO = (action$: any) =>
  action$.pipe(
    ofType(Actions.UPDATE_TODO.REQUEST),
    distinctUntilChanged(),
    debounceTime(750),
    mergeMap((action: any) => {
      const { id } = action.payload;
      return http
        .patch(makeApiUrl(`/t/todo/${id}`), null, action.payload)
        .then(Actions.UPDATE_TODO.success)
        .catch(Actions.UPDATE_TODO.failure);
    })
  );

export const DESTORY_TODO = (action$: any) =>
  action$.pipe(
    ofType(Actions.DESTORY_TODO.REQUEST),
    mergeMap((action: any) => {
      const { id } = action.payload;
      return http
        .delete(makeApiUrl(`/t/todo/${id}`))
        .then(() => {
          return Actions.DESTORY_TODO.success(null, { id: action.payload.ideas });
        })
        .catch(Actions.DESTORY_TODO.failure);
    })
  );

export const GET_TODOBOXS_REQUEST = (actions$: any) =>
  actions$.pipe(
    ofType(Actions.GET_TODOBOXS.REQUEST),
    mergeMap(() => {
      const userId = getCachedUserId();
      return http
        .get(makeApiUrl(`/t/user/${userId}/todo-box`))
        .then(Actions.GET_TODOBOXS.success)
        .catch(Actions.GET_TODOBOXS.failure);
    })
  );
