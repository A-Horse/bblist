import fetch from 'isomorphic-fetch';
import {handleHttpError} from '../services/handle-error';
import {createConfigWithAuth} from './util/header';
import {handleResponse, handleResponseWithoutJson} from '../utils/http-handle';

export const TASKLIST_POST_REQUEST = 'TASKLIST_POST_REQUEST'
export const TASKLIST_POST_SUCCESS = 'TASKLIST_POST_SUCCESS'
export const TASKLIST_POST_FAILURE = 'TASKLIST_POST_FAILURE'

/************* Post *******************/
function requestGetTaskList(user) {
  return {
    type: TASKLIST_POST_REQUEST
  }
}

function receiveGetTaskList() {
  return {
    type: TASKLIST_POST_SUCCESS
  }
}

function getTaskListError(message) {
  return {
    type: TASKLIST_POST_FAILURE,
    message: message
  }
}


export const TASKLIST_PATCH_REQUEST = 'TASKLIST_PATCH_REQUEST'
export const TASKLIST_PATCH_SUCCESS = 'TASKLIST_PATCH_SUCCESS'
export const TASKLIST_PATCH_FAILURE = 'TASKLIST_PATCH_FAILURE'


function requestPatchTaskList(info) {
  return {
    type: TASKLIST_PATCH_REQUEST
  };
}

function receivePatchTaskList(taskList) {
  return {
    type: TASKLIST_PATCH_SUCCESS,
    taskList
  }
}

function patchTaskWallListError(message) {
  return {
    type: TASKLIST_PATCH_FAILURE,
    message: message
  }
}

export function patchTaskList(id, info) {
  const config = createConfigWithAuth('PATCH', info)
  return dispatch => {
    dispatch(requestPatchTaskList);
    return fetch(`/api/task-list/${id}`, config)
      .then(handleResponse)
      .then(response => dispatch(receivePatchTaskList(response)))
  };
}


