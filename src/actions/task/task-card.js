import fetch from 'isomorphic-fetch';
import { handleHttpError } from '../../services/handle-error';
import { createConfigWithAuth } from '../../utils/header';
import { handleResponse, handleResponseWithoutJson } from '../../utils/http-handle';
import { makeApiUrl } from '../../utils/api';

export const TASKCARD_POST_REQUEST = 'TASKCARD_POST_REQUEST';
export const TASKCARD_POST_SUCCESS = 'TASKCARD_POST_SUCCESS';
export const TASKCARD_POST_FAILURE = 'TASKCARD_POST_FAILURE';

/* function requestPostTaskCard(card) {
 *   return {
 *     type: TASKCARD_POST_REQUEST,
 *     card
 *   };
 * }
 *
 * function createTaskCardSuccess(card) {
 *   return {
 *     type: TASKCARD_POST_SUCCESS,
 *     card: card
 *   };
 * }
 *
 * function createTaskCardError(error) {
 *   return {
 *     type: TASKCARD_POST_FAILURE,
 *     message: error.message
 *   };
 * }*/

/* export const TASKCARD_PATCH_REQUEST = 'TASKCARD_PATCH_REQUEST';
 * export const TASKCARD_PATCH_SUCCESS = 'TASKCARD_PATCH_SUCCESS';
 * export const TASKCARD_PATCH_FAILURE = 'TASKCARD_PATCH_FAILURE';
 *
 * function requestUpdateTaskCard(data) {
 *   return {
 *     type: TASKCARD_PATCH_REQUEST,
 *     ...data
 *   };
 * }
 *
 * function updateTaskCardSuccess(card) {
 *   return {
 *     type: TASKCARD_PATCH_SUCCESS,
 *     payload: card
 *   };
 * }
 *
 * function updateTaskCardError(error) {
 *   return {
 *     type: TASKCARD_PATCH_FAILURE,
 *     message: error.message
 *   };
 * }*/

export const TASKCARD_DELETE_REQUEST = 'TASKCARD_DELETE_REQUEST';
export const TASKCARD_DELETE_SUCCESS = 'TASKCARD_DELETE_SUCCESS';
export const TASKCARD_DELETE_FAILURE = 'TASKCARD_DELETE_FAILURE';

function requestDeleteTaskCard(cardId) {
  return {
    type: TASKCARD_DELETE_REQUEST,
    cardId
  };
}

function deleteTaskCardSuccess(cardId) {
  return {
    type: TASKCARD_DELETE_SUCCESS,
    cardId
  };
}

function deleteTaskCardFail(error, cardId) {
  return {
    type: TASKCARD_DELETE_FAILURE,
    error,
    cardId
  };
}

export const CARD_META_REQUEST = 'CARD_META_REQUEST';
export const CARD_META_SUCCESS = 'CARD_META_SUCCESS';
export const CARD_META_FAILURE = 'CARD_META_FAILURE';

function requestCardMeta(id) {
  return {
    type: CARD_META_FAILURE,
    payload: id
  };
}

function receiveCardMeta(data) {
  return {
    type: CARD_META_SUCCESS,
    payload: data
  };
}

function requestCardMetaFail(error) {
  return {
    type: CARD_META_FAILURE,
    payload: error,
    error: true
  };
}

/* export function getCardDetail(cardId) {
 *   const config = createConfigWithAuth('GET');
 *   return dispatch => {
 *     dispatch(requestCardMeta(cardId));
 *     return fetch(makeApiUrl(`/task-card/${cardId}`), config)
 *       .then(handleResponse)
 *       .then(data => dispatch(receiveCardMeta(data)))
 *       .catch(error => requestCardMetaFail(error));
 *   };
 * }*/

export function deleteTaskCard(cardId) {
  const config = createConfigWithAuth('DELETE');
  return dispatch => {
    dispatch(requestDeleteTaskCard(cardId));
    return fetch(makeApiUrl(`/task-card/${cardId}`), config)
      .then(handleResponseWithoutJson)
      .then(() => dispatch(deleteTaskCardSuccess(cardId)))
      .catch(error => deleteTaskCardFail(error, cardId));
  };
}

/* export function updateTaskCard(cardId, data) {
 *
 *   const config = createConfigWithAuth('PATCH', data);
 *   return dispatch => {
 *     return fetch(makeApiUrl(`/task-card/${cardId}`), config)
 *       .then(handleResponse)
 *       .then(card => dispatch(updateTaskCardSuccess(card)))
 *       .catch(error => dispatch(updateTaskCardError(error)));
 *   };
 * }*/

/* export function createTaskCard(card) {
 *   const config = createConfigWithAuth('POST', card);
 *   return dispatch => {
 *     dispatch(requestPostTaskCard(card));
 *     return fetch(makeApiUrl('/task-card'), config)
 *       .then(handleResponse)
 *       .then(response => dispatch(createTaskCardSuccess(response)))
 *       .catch(error => dispatch(updateTaskCardError(error)));
 *   };
 * }*/
