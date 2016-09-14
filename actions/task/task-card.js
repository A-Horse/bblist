import fetch from 'isomorphic-fetch';
import {handleHttpError} from '../../services/handle-error';
import {createConfigWithAuth} from '../../utils/header';
import {handleResponse, handleResponseWithoutJson} from '../../utils/http-handle';

export const TASKCARD_POST_REQUEST = 'TASKCARD_POST_REQUEST';
export const TASKCARD_POST_SUCCESS = 'TASKCARD_POST_SUCCESS';
export const TASKCARD_POST_FAILURE = 'TASKCARD_POST_FAILURE';

function requestPostTaskCard(card) {
  return {
    type: TASKCARD_POST_REQUEST,
    card
  }
}

function createTaskCardSuccess(card) {
  return {
    type: TASKCARD_POST_SUCCESS,
    card: card
  }
}

function createTaskCardError(error) {
  return {
    type: TASKCARD_POST_FAILURE,
    message: error.message
  }
}

export const TASKCARD_PATCH_REQUEST = 'TASKCARD_PATCH_REQUEST';
export const TASKCARD_PATCH_SUCCESS = 'TASKCARD_PATCH_SUCCESS';
export const TASKCARD_PATCH_FAILURE = 'TASKCARD_PATCH_FAILURE';

function requestUpdateTaskCard(data) {
  return {
    type: TASKCARD_PATCH_REQUEST,
    ...data
  }
}

function updateTaskCardSuccess() {
  return {
    type: TASKCARD_PATCH_SUCCESS
  }
}

function updateTaskCardError(error) {
  return {
    type: TASKCARD_PATCH_FAILURE,
    message: error.message
  }
}

export const TASKCARD_LEAVE_START = 'TASKCARD_LEAVE_START';
export const TASKCARD_LEAVE_DONE = 'TASKCARD_LEAVE_DONE';
export const TASKCARD_ENTER_START = 'TASKCARD_ENTER_START';
export const TASKCARD_ENTER_DONE = 'TASKCARD_ENTER_DONE';

export function taskCardDragLeave(card) {
  return dispatch => {
    
  };
}

export function taskCardDragEnter(card) {
  return dispatch => {
    
  };
}

export function updateTaskCard(data) {
  const config = createConfigWithAuth('PATCH', data);
  return dispatch => {
    return fetch('/api/task-card', config)
      .then(handleResponse)
      .then(response => dispatch(updateTaskCardSuccess(response)))
      .catch(error => dispatch(updateTaskCardError(error)));
  };
}

export function createTaskCard(card) {
  const config = createConfigWithAuth('POST', card);
  return dispatch => {
    dispatch(requestPostTaskCard(card))
    return fetch('/api/task-card', config)
      .then(handleResponse)
      .then(response => dispatch(createTaskCardSuccess(response)))
      .catch(error => dispatch(updateTaskCardError(error)));
  }
}


