import fetch from 'isomorphic-fetch';
import {handleHttpError} from '../../services/handle-error';
import {createConfigWithAuth} from '../../utils/header';
import {handleResponse, handleResponseWithoutJson} from '../../utils/http-handle';
import {getAuthData} from '../../utils/auth';
import {CACHED_USERID} from '../../constants';
import {makeApiUrl} from '../../utils/api';

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

function requestTaskWalls() {
  return {
    type: TASKWALL_GET_REQUEST
  }
}

function receiveTaskWalls(walls) {
  return {
    type: TASKWALL_GET_SUCCESS,
    playload: walls
  }
}

function receiveTaskWallsFail(error) {
  return {
    type: TASKWALL_GET_FAILURE,
    playload: error,
    error: true
  }
}


function requestTaskWallCards() {
  return {
    type: ALL_TASKCARD_GET_REQUEST
  }
}

function receiveTaskWallCards(resp) {
  return {
    type: ALL_TASKCARD_GET_SUCCESS,
    playload: resp
  }
}

function receiveTaskWallCardsFail(status) {
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

export function getTaskAllCards(wallId) {
  const config = createConfigWithAuth('GET');
  const userId = getAuthData(CACHED_USERID);
  return dispatch => {
    dispatch(requestTaskWallCards())
    return fetch(makeApiUrl(`/user/${userId}/task-wall/${wallId}/all`), config)
      .then(handleResponse)
      .then(response => dispatch(receiveTaskWallCards(response)))
      .catch(error => dispatch(receiveTaskWallCardsFail(error)));
  };
}

export function getAllTaskWall() {
  const config = createConfigWithAuth('GET');
  return dispatch => {
    dispatch(requestTaskWalls())
    return fetch(makeApiUrl('/task-wall'), config)
      .then(handleResponse)
      .then(response => dispatch(receiveTaskWalls(response)))
      .catch(error => dispatch(receiveTaskWallsFail(error)));
  };
}

export function createTaskWall(CreateWallInfo) {
  const config = createConfigWithAuth('POST', CreateWallInfo);
  return dispatch => {
    dispatch(requestCreateTaskWall());
    return fetch(makeApiUrl('/task-wall'), config)
      .then(handleResponse)
      .then(response => dispatch(receiveCreateTaskWall(response)))
      .catch(handleHttpError);
  }
}

export function deleteTaskWall(wallInfo) {
  const config = createConfigWithAuth('DELETE');
  return dispatch => {
    dispatch(requestDeleteTaskWall(wallInfo));
    return fetch(makeApiUrl(`/task-wall/${wallInfo.id}`), config)
      .then(handleResponseWithoutJson)
      .then(response => dispatch(deleteTaskWallSuccess(response)));
  };
}
