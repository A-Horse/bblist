/* import fetch from 'isomorphic-fetch';
 * import { createConfigWithAuth } from 'utils/header';
 * import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';
 * import { getCachedUserId } from 'utils/auth';
 * import { CACHED_USERID } from '../../constants';
 * import { makeApiUrl } from 'utils/api';*/

/*
 * export const TODOBOX_GET_REQUEST = 'TODOBOX_GET_REQUEST';
 * export const TODOBOX_GET_SUCCESS = 'TODOBOX_GET_SUCCESS';
 * export const TODOBOX_GET_FAILURE = 'TODOBOX_GET_FAILURE';
 *
 * function requestTodoBox() {
 *   return {
 *     type: TODOBOX_GET_REQUEST
 *   };
 * }
 *
 * function receiveTodoBoxSuccess(payload) {
 *   return {
 *     type: TODOBOX_GET_SUCCESS,
 *     payload
 *   };
 * }
 *
 * function receiveTodoBoxFailure(error) {
 *   return {
 *     type: TODOBOX_GET_FAILURE,
 *     payload: error,
 *     error: true
 *   };
 * }
 * */
/* export function getTodoBoxs() {
 *   const config = createConfigWithAuth('GET');
 *   const userId = getCachedUserId();
 *   return dispatch => {
 *     dispatch(requestTodoBox());
 *     return fetch(makeApiUrl(`/t/user/${userId}/todo-box`), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(receiveTodoBoxSuccess(response)))
 *       .catch(error => dispatch(receiveTodoBoxFailure(error)));
 *   };
 * }*/
/*
 * export const TODOBOX_CREATE_REQUEST = 'TODOBOX_CREATE_REQUEST';
 * export const TODOBOX_CREATE_SUCCESS = 'TODOBOX_CREATE_SUCCESS';
 * export const TODOBOX_CREATE_FAILURE = 'TODOBOX_CREATE_FAILURE';
 *
 * function requestCreateTodoBox() {
 *   return {
 *     type: TODOBOX_CREATE_REQUEST
 *   };
 * }
 *
 * function createTodoBoxSuccess(payload) {
 *   return {
 *     type: TODOBOX_CREATE_SUCCESS,
 *     payload
 *   };
 * }
 *
 * function createTodoBoxFailure(error) {
 *   return {
 *     type: TODOBOX_CREATE_FAILURE,
 *     payload: error,
 *     error: true
 *   };
 * }
 *
 * export function createTodoBox(data) {
 *   const config = createConfigWithAuth('POST', data);
 *   return dispatch => {
 *     dispatch(requestCreateTodoBox());
 *     return fetch(makeApiUrl(`/t/todo-box`), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(createTodoBoxSuccess(response)))
 *       .catch(error => dispatch(createTodoBoxFailure(error)));
 *   };
 * }*/
/*
 * export const TODOLIST_GET_REQUEST = 'TODOLIST_GET_REQUEST';
 * export const TODOLIST_GET_SUCCESS = 'TODOLIST_GET_SUCCESS';
 * export const TODOLIST_GET_FAILURE = 'TODOLIST_GET_FAILURE';
 *
 * function requestTodoList() {
 *   return {
 *     type: TODOLIST_GET_REQUEST
 *   };
 * }
 *
 * function receiveTodoList(payload, meta) {
 *   return {
 *     type: TODOLIST_GET_SUCCESS,
 *     payload,
 *     meta
 *   };
 * }
 *
 * function receiveTodoListError(error) {
 *   return {
 *     type: TODOLIST_GET_FAILURE,
 *     error: true,
 *     payload: error
 *   };
 * }*/
/*
 * export function getTodoList(meta) {
 *   const config = createConfigWithAuth('GET');
 *   const userId = getCachedUserId();
 *   return dispatch => {
 *     dispatch(requestTodoList(meta));
 *     return fetch(makeApiUrl(`/user/${userId}/todo`), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(receiveTodoList(response, meta)))
 *       .catch(error => dispatch(receiveTodoListError(error.message)));
 *   };
 * }*/
/*
 * export const TODO_POST_REQUEST = 'TODO_POST_REQUEST';
 * export const TODO_POST_SUCCESS = 'TODO_POST_SUCCESS';
 * export const TODO_POST_FAILURE = 'TODO_POST_FAILURE';*/
/*
 * function requestCreateTodo() {
 *   return {
 *     type: TODO_POST_REQUEST
 *   };
 * }
 *
 * function createTodoSucceess(payload) {
 *   return {
 *     type: TODO_POST_SUCCESS,
 *     payload
 *   };
 * }
 *
 * function createTodoError(error) {
 *   return {
 *     type: TODO_POST_FAILURE,
 *     payload: error,
 *     error: true
 *   };
 * }*/
/*
 * export function createTodo(data) {
 *   const config = createConfigWithAuth('POST', data);
 *   const userId = getCachedUserId();
 *   return dispatch => {
 *     dispatch(requestCreateTodo());
 *     return fetch(makeApiUrl(`/user/${userId}/todo`), config)
 *       .then(handleResponse)
 *       .then(resp => dispatch(createTodoSucceess(resp)))
 *       .catch(error => dispatch(createTodoError(error)));
 *   };
 * }
 * */
/*
 * export const TODO_DESTORY_REQUEST = 'TODO_DESTORY_REQUEST';
 * export const TODO_DESTORY_SUCCESS = 'TODO_DESTORY_SUCCESS';
 * export const TODO_DESTORY_FAILURE = 'TODO_DESTORY_FAILURE';
 *
 * function requestDestroyTodo(id) {
 *   return {
 *     type: TODO_DESTORY_REQUEST,
 *     payload: id
 *   };
 * }
 *
 * function destroyTodoSuccess(payload) {
 *   return {
 *     type: TODO_DESTORY_SUCCESS,
 *     payload
 *   };
 * }
 *
 * function destroyTodoError(error) {
 *   return {
 *     type: TODO_DESTORY_FAILURE,
 *     payload: error,
 *     error: true
 *   };
 * }
 *
 * export function destroyTodo(todoId) {
 *   const config = createConfigWithAuth('DELETE');
 *   return dispatch => {
 *     dispatch(requestDestroyTodo());
 *     return fetch(makeApiUrl(`/todo/${todoId}`), config)
 *       .then(handleResponseWithoutJson)
 *       .then(() => dispatch(destroyTodoSuccess({ todoId })))
 *       .catch(error => dispatch(destroyTodoError(error)));
 *   };
 * }
 * */
/*
 * export const TODO_PATCH_REQUEST = 'TODO_PATCH_REQUEST';
 * export const TODO_PATCH_SUCCESS = 'TODO_PATCH_SUCCESS';
 * export const TODO_PATCH_FAILURE = 'TODO_PATCH_FAILURE';
 *
 * function requestUpdateTodo(data) {
 *   return {
 *     type: TODO_PATCH_REQUEST,
 *     payload: data
 *   };
 * }
 *
 * function updateTodoSuccess(payload) {
 *   return {
 *     type: TODO_PATCH_SUCCESS,
 *     payload
 *   };
 * }
 *
 * function updateTodoError(error) {
 *   return {
 *     type: TODO_PATCH_FAILURE,
 *     error: true,
 *     payload: error
 *   };
 * }
 * */
/* export function updateTodo(id, data) {
 *   const config = createConfigWithAuth('PATCH', data);
 *   return dispatch => {
 *     return fetch(makeApiUrl(`/todo/${id}`), config)
 *       .then(handleResponse)
 *       .then(resp => dispatch(updateTodoSuccess(resp)))
 *       .catch(error => dispatch(updateTodoError(error)));
 *   };
 * }*/
