import fetch from 'isomorphic-fetch';
import {handleHttpError} from '../services/handle-error';
import {createConfigWithAuth} from './util/header';
import {handleResponse, handleResponseWithoutJson} from '../utils/http-handle';

export const TASKWALL_GET_REQUEST = 'TASKWALL_GET_REQUEST';
export const TASKWALL_GET_SUCCESS = 'TASKWALL_GET_SUCCESS';
export const TASKWALL_GET_FAILURE = 'TASKWALL_GET_FAILURE';

export const TASKWALL_POST_REQUEST = 'TASKWALL_POST_REQUEST';
export const TASKWALL_POST_SUCCESS = 'TASKWALL_POST_SUCCESS';
export const TASKWALL_POST_FAILURE = 'TASKWALL_POST_FAILURE';

export const TASKWALL_DELETE_REQUEST = 'TASKWALL_DELETE_REQUEST';
export const TASKWALL_DELETE_SUCCESS = 'TASKWALL_DELETE_SUCCESS';
export const TASKWALL_DELETE_FAILURE = 'TASKWALL_DELETE_FAILURE';

export const ALL_TASKCARD_GET_REQUEST = 'TASKCARD_GET_REQUEST';
export const ALL_TASKCARD_GET_SUCCESS = 'TASKCARD_GET_SUCCESS';
export const ALL_TASKCARD_GET_FAILURE = 'TASKCARD_GET_FAILURE';

function requestGetTaskWall(user) {
  return {
    type: TASKWALL_GET_REQUEST
  }
}

function receiveGetTaskWall(walls) {
  return {
    type: TASKWALL_GET_SUCCESS,
    walls: walls
  }
}

function getTaskWallError(message) {
  return {
    type: TASKWALL_GET_FAILURE,
    message: message
  }
}


function requestGetTaskWallCards() {
  return {
    type: ALL_TASKCARD_GET_REQUEST
  }
}

function receiveGetTaskWallCards(wallData) {
  return {
    type: ALL_TASKCARD_GET_SUCCESS,
    wallData: wallData
  }
}

function getTaskWallCardsError(status) {
  return {
    type: ALL_TASKCARD_GET_FAILURE,
    status: status
  }
}


function requestCreateTaskWall() {
  return {
    type: TASKWALL_POST_REQUEST
  }
}

function receiveCreateTaskWall() {
  return {
    type: TASKWALL_POST_SUCCESS
  }
}

function createTaskWallError() {
  return {
    type: TASKWALL_POST_FAILURE
  }
}

function requestDeleteTaskWall() {
  return {
    type: TASKWALL_DELETE_REQUEST
  }
}

function deleteTaskWallSuccess() {
  return {
    type: TASKWALL_DELETE_SUCCESS
  }
}

function deleteTaskWallError() {
  return {
    type: TASKWALL_DELETE_FAILURE
  }
}

/************* Method *******************/

export function getTaskAllCards(wallId) {
  const config = createConfigWithAuth('GET');
  return dispatch => {
    dispatch(requestGetTaskWallCards())
    return fetch(`/api/task-wall/${wallId}/all`, config)
      .then(handleResponse)
      .then(response => dispatch(receiveGetTaskWallCards(response)))
      .catch(handleHttpError)
  }
}

export function getAllTaskWall() {
  const config = createConfigWithAuth('GET');
  return dispatch => {
    dispatch(requestGetTaskWall())
    return fetch('/api/task-wall', config)
      .then(handleResponse)
      .then(response => dispatch(receiveGetTaskWall(response)))
      .catch(handleHttpError);
  }
}

export function createTaskWall(CreateWallInfo) {
  const config = createConfigWithAuth('POST', CreateWallInfo);
  return dispatch => {
    dispatch(requestCreateTaskWall());
    return fetch('/api/task-wall', config)
      .then(handleResponse)
      .then(response => dispatch(receiveCreateTaskWall(response)))
      .catch(handleHttpError);
  }
}

export function deleteTaskWall(wallInfo) {
  const config = createConfigWithAuth('DELETE');
  return dispatch => {
    dispatch(requestDeleteTaskWall(wallInfo));
    return fetch(`/api/task-wall/${wallInfo.id}`, config)
      .then(handleResponseWithoutJson)
      .then(response => dispatch(deleteTaskWallSuccess(response)));
  };
}
