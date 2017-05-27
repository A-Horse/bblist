import fetch from 'isomorphic-fetch';
import {createConfigWithAuth} from 'utils/header';
import {handleResponse, handleResponseWithoutJson} from 'utils/http-handle';
import {getAuthData} from 'utils/auth';
import {CACHED_USERID} from 'constants';
import {makeApiUrl} from 'utils/api';

export const TODOLIST_GET_REQUEST = 'TODOLIST_GET_REQUEST';
export const TODOLIST_GET_SUCCESS = 'TODOLIST_GET_SUCCESS';
export const TODOLIST_GET_FAILURE = 'TODOLIST_GET_FAILURE';

function requestTodoList() {
  return {
    type: TODOLIST_GET_REQUEST
  };
}

function receiveTodoList(todos) {
  return {
    type: TODOLIST_GET_SUCCESS,
    todos
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

function createTodoSucceess(todo) {
  return {
    type: TODO_POST_SUCCESS,
    playload: todo
  };
}

function createTodoError(error) {
  return {
    type: TODO_POST_FAILURE,
    playload: error,
    error: true
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

function updateTodoSuccess() {
  return {
    type: TODO_PATCH_SUCCESS
  };
}

function updateTodoError(error) {
  return {
    type: TODO_PATCH_FAILURE,
    error: true,
    playload: error
  };
}

export const TODO_DELETE_REQUEST = 'TODO_DELETE_REQUEST';
export const TODO_DELETE_SUCCESS = 'TODO_DELETE_SUCCESS';
export const TODO_DELETE_FAILURE = 'TODO_DELETE_FAILURE';

function requestDestroyGoal(id) {
  return {
    type: TODO_DELETE_REQUEST,
    playload: id
  };
}

function destroyTodoSuccess() {
  return {
    type: TODO_DELETE_SUCCESS
  };
}

function destroyTodoError(error) {
  return {
    type: TODO_DELETE_FAILURE,
    playload: error,
    error: true
  };
}

export function destroyTodo(id) {
  const config = createConfigWithAuth('DELETE');
  return dispatch => {
    dispatch(requestDestroyGoal());
    return fetch(makeApiUrl(`/todo/${id}`), config)
      .then(handleResponseWithoutJson)
      .then(() => dispatch(destroyTodoSuccess()))
      .catch(error => dispatch(destroyTodoError(error)));
  };
}

export function getTodoList() {
  const config = createConfigWithAuth('GET');
  const userId = getAuthData(CACHED_USERID);
  console.log("userId = ", userId);
  return dispatch => {
    dispatch(requestTodoList());
    return fetch(makeApiUrl(`/user/${userId}/todo`), config)
      .then(handleResponse)
      .then(response => dispatch(receiveTodoList(response)))
      .catch(error => dispatch(receiveTodoListError(error.message)));
  };
}

export function updateTodo(id, data) {
  const config = createConfigWithAuth('PATCH', data);
  return dispatch => {
    return fetch(makeApiUrl(`/todo/${id}`), config)
      .then(handleResponseWithoutJson)
      .then(() => dispatch(updateTodoSuccess()))
      .catch(error => dispatch(updateTodoError(error)));
  };
}

export function createTodo(data) {
  const config = createConfigWithAuth('POST', data);
  const userId = getAuthData(CACHED_USERID);
  return dispatch => {
    dispatch(requestCreateTodo());
    return fetch(makeApiUrl(`/user/${userId}/todo`), config)
      .then(handleResponse)
      .then(() => dispatch(createTodoSucceess()))
      .catch(() => dispatch(createTodoError()));
  };
}
