import fetch from 'isomorphic-fetch';
import { createConfigWithAuth } from 'utils/header';
import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';
import { getCachedUserId } from 'utils/auth';
import { CACHED_USERID } from '../../constants';
import { makeApiUrl } from 'utils/api';

export const TODOBOX_GET_REQUEST = 'TODOBOX_GET_REQUEST';
export const TODOBOX_GET_SUCCESS = 'TODOBOX_GET_SUCCESS';
export const TODOBOX_GET_FAILURE = 'TODOBOX_GET_FAILURE';

function requestTodoBox() {
  return {
    type: TODOBOX_GET_REQUEST
  };
}

function receivetodoBoxSuccess(todos) {
  return {
    type: TODOBOX_GET_SUCCESS,
    playload: todos
  };
}

function receiveTodoBoxFailure(error) {
  return {
    type: TODOBOX_GET_FAILURE,
    error: true,
    playload: error
  };
}


export const TODOLIST_GET_REQUEST = 'TODOLIST_GET_REQUEST';
export const TODOLIST_GET_SUCCESS = 'TODOLIST_GET_SUCCESS';
export const TODOLIST_GET_FAILURE = 'TODOLIST_GET_FAILURE';

function requestTodoList() {
  return {
    type: TODOLIST_GET_REQUEST
  };
}

function receiveTodoList(playload, meta) {
  return {
    type: TODOLIST_GET_SUCCESS,
    playload,
    meta
  };
}

function receiveTodoListError(error) {
  return {
    type: TODOLIST_GET_FAILURE,
    error: true,
    playload: error
  };
}

export const TODO_POST_REQUEST = 'TODO_POST_REQUEST';
export const TODO_POST_SUCCESS = 'TODO_POST_SUCCESS';
export const TODO_POST_FAILURE = 'TODO_POST_FAILURE';

function requestCreateTodo() {
  return {
    type: TODO_POST_REQUEST
  };
}

function createTodoSucceess(playload) {
  return {
    type: TODO_POST_SUCCESS,
    playload
  };
}

function createTodoError(error) {
  return {
    type: TODO_POST_FAILURE,
    playload: error,
    error: true
  };
}

export function createTodo(data) {
  const config = createConfigWithAuth('POST', data);
  const userId = getCachedUserId();
  return dispatch => {
    dispatch(requestCreateTodo());
    return fetch(makeApiUrl(`/user/${userId}/todo`), config)
      .then(handleResponse)
      .then(resp => dispatch(createTodoSucceess(resp)))
      .catch(error => dispatch(createTodoError(error)));
  };
}


export const TODO_DESTORY_REQUEST = 'TODO_DESTORY_REQUEST';
export const TODO_DESTORY_SUCCESS = 'TODO_DESTORY_SUCCESS';
export const TODO_DESTORY_FAILURE = 'TODO_DESTORY_FAILURE';

function requestDestroyTodo(id) {
  return {
    type: TODO_DESTORY_REQUEST,
    playload: id
  };
}

function destroyTodoSuccess(playload) {
  return {
    type: TODO_DESTORY_SUCCESS,
    playload
  };
}

function destroyTodoError(error) {
  return {
    type: TODO_DESTORY_FAILURE,
    playload: error,
    error: true
  };
}

export function destroyTodo(todoId) {
  const config = createConfigWithAuth('DELETE');
  return dispatch => {
    dispatch(requestDestroyTodo());
    return fetch(makeApiUrl(`/todo/${todoId}`), config)
      .then(handleResponseWithoutJson)
      .then(() => dispatch(destroyTodoSuccess({todoId})))
      .catch(error => dispatch(destroyTodoError(error)));
  };
}

export function getTodoList(meta) {
  const config = createConfigWithAuth('GET');
  const userId = getCachedUserId();
  return dispatch => {
    dispatch(requestTodoList(meta));
    return fetch(makeApiUrl(`/user/${userId}/todo`), config)
      .then(handleResponse)
      .then(response => dispatch(receiveTodoList(response, meta)))
      .catch(error => dispatch(receiveTodoListError(error.message)));
  };
}


export const TODO_PATCH_REQUEST = 'TODO_PATCH_REQUEST';
export const TODO_PATCH_SUCCESS = 'TODO_PATCH_SUCCESS';
export const TODO_PATCH_FAILURE = 'TODO_PATCH_FAILURE';

function requestUpdateTodo(data) {
  return {
    type: TODO_PATCH_REQUEST,
    playload: data
  };
}

function updateTodoSuccess(playload) {
  return {
    type: TODO_PATCH_SUCCESS,
    playload
  };
}

function updateTodoError(error) {
  return {
    type: TODO_PATCH_FAILURE,
    error: true,
    playload: error
  };
}

export function updateTodo(id, data) {
  const config = createConfigWithAuth('PATCH', data);
  return dispatch => {
    return fetch(makeApiUrl(`/todo/${id}`), config)
      .then(handleResponse)
      .then(resp => dispatch(updateTodoSuccess(resp)))
      .catch(error => dispatch(updateTodoError(error)));
  };
}
