/* import fetch from 'isomorphic-fetch';
 * import { handleHttpError } from '../../services/handle-error';
 * import { createConfigWithAuth } from '../../utils/header';
 * import { handleResponse, handleResponseWithoutJson } from '../../utils/http-handle';
 * import { makeApiUrl } from '../../utils/api';
 * import { getCachedUserId } from 'utils/auth';
 *
 * export const TASKWALL_GET_REQUEST = 'TASKWALL_GET_REQUEST';
 * export const TASKWALL_GET_SUCCESS = 'TASKWALL_GET_SUCCESS';
 * export const TASKWALL_GET_FAILURE = 'TASKWALL_GET_FAILURE';
 *
 * export const TASKWALL_POST_REQUEST = 'TASKWALL_POST_REQUEST';
 * export const TASKWALL_POST_SUCCESS = 'TASKWALL_POST_SUCCESS';
 * export const TASKWALL_POST_FAILURE = 'TASKWALL_POST_FAILURE';*/

/* export const TASKWALL_DELETE_REQUEST = 'TASKWALL_DELETE_REQUEST';
 * export const TASKWALL_DELETE_SUCCESS = 'TASKWALL_DELETE_SUCCESS';
 * export const TASKWALL_DELETE_FAILURE = 'TASKWALL_DELETE_FAILURE';*/

/* export const ALL_TASKCARD_GET_REQUEST = 'TASKCARD_GET_REQUEST';
 * export const ALL_TASKCARD_GET_SUCCESS = 'TASKCARD_GET_SUCCESS';
 * export const ALL_TASKCARD_GET_FAILURE = 'TASKCARD_GET_FAILURE';
 *
 * import { normalize, arrayOf } from 'normalizr';
 *
 * import { track, card, user, board } from 'schema';*/

/* function requestTaskWalls() {
 *   return {
 *     type: TASKWALL_GET_REQUEST
 *   };
 * }
 *
 * function receiveTaskWalls(response) {
 *   return {
 *     type: TASKWALL_GET_SUCCESS,
 *     playload: response
 *   };
 * }
 *
 * function receiveTaskWallsFail(error) {
 *   return {
 *     type: TASKWALL_GET_FAILURE,
 *     playload: error,
 *     error: true
 *   };
 * }*/
/*
 * export function getAllTaskBoard() {
 *   const config = createConfigWithAuth('GET');
 *   const userId = getCachedUserId();
 *   return dispatch => {
 *     dispatch(requestTaskWalls());
 *     return fetch(makeApiUrl(`/tk/user/${userId}/task-board`), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(receiveTaskWalls(response)))
 *       .catch(error => dispatch(receiveTaskWallsFail(error)));
 *   };
 * }*/
/*
 * function requestTaskWallCards() {
 *   return {
 *     type: ALL_TASKCARD_GET_REQUEST
 *   };
 * }
 *
 * function receiveTaskWallCards(response) {
 *   return {
 *     type: ALL_TASKCARD_GET_SUCCESS,
 *     playload: normalize(response, board)
 *   };
 * }
 *
 * function receiveTaskWallCardsFail(status) {
 *   return {
 *     type: ALL_TASKCARD_GET_FAILURE,
 *     status: status
 *   };
 * }
 * */
/* function requestCreateTaskWall() {
 *   return {
 *     type: TASKWALL_POST_REQUEST
 *   };
 * }
 *
 * function receiveCreateTaskWall() {
 *   return {
 *     type: TASKWALL_POST_SUCCESS
 *   };
 * }
 *
 * function createTaskWallError() {
 *   return {
 *     type: TASKWALL_POST_FAILURE
 *   };
 * }*/
/*
 * function requestDeleteTaskWall() {
 *   return {
 *     type: TASKWALL_DELETE_REQUEST
 *   };
 * }
 *
 * function deleteTaskWallSuccess() {
 *   return {
 *     type: TASKWALL_DELETE_SUCCESS
 *   };
 * }
 *
 * function deleteTaskWallError() {
 *   return {
 *     type: TASKWALL_DELETE_FAILURE
 *   };
 * }*/
/*
 * export const TASKBOARD_RENAME_REQUEST = 'TASKBOARD_RENAME_REQUEST';
 *
 * export function requestRenameTaskBoard(boardId, newName) {
 *   return {
 *     type: TASKBOARD_RENAME_REQUEST,
 *     playload: {
 *       boardId: boardId,
 *       name: newName
 *     }
 *   };
 * }
 *
 * export const TASKBOARD_DESCRIPTION_UPDATE_REQUEST = 'TASKBOARD_DESCRIPT_UPDATE_REQUEST';
 *
 * export function requestUpdateTaskBoardDescription(boardId, description) {
 *   return {
 *     type: TASKBOARD_DESCRIPTION_UPDATE_REQUEST,
 *     playload: {
 *       boardId: board,
 *       description: description
 *     }
 *   };
 * }
 *
 * export const TASKBOARD_PATCH_SUCCESS = 'TASKBOARD_PATCH_REQUEST';
 *
 * export function updateTaskBoardSuccess(board) {
 *   return {
 *     type: TASKBOARD_PATCH_SUCCESS,
 *     playload: board
 *   };
 * }
 * */
/* export function getTaskAllCards(wallId) {
 *   const config = createConfigWithAuth('GET');
 *   const userId = getAuthData(CACHED_USERID);
 *   return dispatch => {
 *     dispatch(requestTaskWallCards());
 *     return fetch(makeApiUrl(`/user/${userId}/task-wall/${wallId}/all`), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(receiveTaskWallCards(response)))
 *       .catch(error => dispatch(receiveTaskWallCardsFail(error)));
 *   };
 * }*/
/*
 * export function createTaskBoard(CreateWallInfo) {
 *   const config = createConfigWithAuth('POST', CreateWallInfo);
 *   return dispatch => {
 *     dispatch(requestCreateTaskWall());
 *     return fetch(makeApiUrl('/task-wall'), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(receiveCreateTaskWall(response)))
 *       .catch(handleHttpError);
 *   };
 * }
 * */
/* export function deleteTaskBoard(boardId) {
 *   const config = createConfigWithAuth('DELETE');
 *   return dispatch => {
 *     dispatch(requestDeleteTaskWall(boardId));
 *     return fetch(makeApiUrl(`/task-wall/${boardId}`), config)
 *       .then(handleResponseWithoutJson)
 *       .then(response => dispatch(deleteTaskWallSuccess(response)));
 *   };
 * }*/
