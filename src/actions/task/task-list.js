/* import fetch from 'isomorphic-fetch';
 * import { handleHttpError } from '../../services/handle-error';
 * import { createConfigWithAuth } from '../../utils/header';
 * import { makeApiUrl } from '../../utils/api';
 * import { handleResponse, handleResponseWithoutJson } from '../../utils/http-handle';
 *
 * export const TASKLIST_POST_REQUEST = 'TASKLIST_POST_REQUEST';
 * export const TASKLIST_POST_SUCCESS = 'TASKLIST_POST_SUCCESS';
 * export const TASKLIST_POST_FAILURE = 'TASKLIST_POST_FAILURE';
 *
 * function requestCreateTaskList(user) {
 *   return {
 *     type: TASKLIST_POST_REQUEST
 *   };
 * }
 *
 * function receiveCreateTaskList() {
 *   return {
 *     type: TASKLIST_POST_SUCCESS
 *   };
 * }
 *
 * function createTaskListError(message) {
 *   return {
 *     type: TASKLIST_POST_FAILURE,
 *     message: message
 *   };
 * }
 *
 * export const TASKLIST_PATCH_REQUEST = 'TASKLIST_PATCH_REQUEST';
 * export const TASKLIST_PATCH_SUCCESS = 'TASKLIST_PATCH_SUCCESS';
 * export const TASKLIST_PATCH_FAILURE = 'TASKLIST_PATCH_FAILURE';
 *
 * function requestPatchTaskList(info) {
 *   return {
 *     type: TASKLIST_PATCH_REQUEST
 *   };
 * }
 *
 * function receivePatchTaskList(taskList) {
 *   return {
 *     type: TASKLIST_PATCH_SUCCESS,
 *     taskList
 *   };
 * }
 *
 * function patchTaskWallListError(message) {
 *   return {
 *     type: TASKLIST_PATCH_FAILURE,
 *     message: message
 *   };
 * }
 *
 * export const TASKLIST_DELETE_REQUEST = 'TASKLIST_DELETE_REQUEST';
 * export const TASKLIST_DELETE_SUCCESS = 'TASKLIST_DELETE_SUCCESS';
 * export const TASKLIST_DELETE_FAILURE = 'TASKLIST_DELETE_FAILURE';
 * */
// export const TASKTRACK_CHANGE_INDEX_SUCCESS = 'TASKTRACK_CHANGE_INDEX_SUCCESS';
/*
 * function updateTaskTrackIndexSuccess(payload) {
 *   return {
 *     type: TASKTRACK_CHANGE_INDEX_SUCCESS,
 *     payload: payload
 *   };
 * }
 * */
/* function requestDeleteTaskList(info) {
 *   return {
 *     type: TASKLIST_DELETE_REQUEST
 *   };
 * }
 *
 * function receiveDeleteTaskList(taskList) {
 *   return {
 *     type: TASKLIST_DELETE_SUCCESS,
 *     taskList
 *   };
 * }
 *
 * function deleteTaskWallListError(message) {
 *   return {
 *     type: TASKLIST_DELETE_FAILURE,
 *     message: message
 *   };
 * }
*
 * export function deleteTaskList(wallId, listId) {
 *   const config = createConfigWithAuth('DELETE');
 *   return dispatch => {
 *     dispatch(requestDeleteTaskList());
 *     return fetch(makeApiUrl(`/task-wall/${wallId}/list/${listId}`), config)
 *       .then(handleResponseWithoutJson)
 *       .then(() => dispatch(receiveDeleteTaskList()));
 *   };
 * }
 * */
/* export function createTaskList(wallId, info) {
 *   const config = createConfigWithAuth('POST', info);
 *   return dispatch => {
 *     dispatch(receiveCreateTaskList());
 *     return fetch(makeApiUrl(`/task-wall/${wallId}/list`), config)
 *       .then(handleResponseWithoutJson)
 *       .then(() => dispatch(receiveCreateTaskList()));
 *   };
 * }*/
/*
 * export function updateTaskTrackIndex(boardId, trackIndexs) {
 *   const config = createConfigWithAuth('PATCH', { trackIndexs });
 *   return dispatch => {
 *     return fetch(makeApiUrl(`/task-board/${boardId}/track/index`), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(updateTaskTrackIndexSuccess));
 *   };
 * }
 * */
/* export function updateTaskList(boardId, trackId, data) {
 *   const config = createConfigWithAuth('PATCH', data);
 *   return dispatch => {
 *     dispatch(requestPatchTaskList);
 *     return fetch(makeApiUrl(`/task-wall/${boardId}/list/${trackId}`), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(receivePatchTaskList(response)));
 *   };
 * }*/
