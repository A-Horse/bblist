import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

import { handleHttpError } from '../services/handle-error'

export const TASKWALL_GET_REQUEST = 'TASKWALL_GET_REQUEST'
export const TASKWALL_GET_SUCCESS = 'TASKWALL_GET_SUCCESS'
export const TASKWALL_GET_FAILURE = 'TASKWALL_GET_FAILURE'

export const TASKWALL_POST_REQUEST = 'TASKWALL_POST_REQUEST'
export const TASKWALL_POST_SUCCESS = 'TASKWALL_POST_SUCCESS'
export const TASKWALL_POST_FAILURE = 'TASKWALL_POST_FAILURE'

/************* Get *******************/

function requestGetTaskWall(user) {
  return {
    type: TASKWALL_GET_REQUEST,
    isFetching: true
    // user_id_jwt
  }
}

function receiveGetTaskWall() {
  return {
    type: TASKWALL_POST_SUCCESS,
    isFetching: false
  }
}

function getTaskWallError(message) {
  return {
    type: TASKWALL_POST_FAILURE,
    isFetching: false,
    message: message
  }
}


/************* Post *******************/



/************* Method *******************/

export function getAllTaskWall(user) {
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json' },
    body: {}
  }

  return dispatch => {
    dispatch(requestGetTaskWall())
    return fetch('/api/task-wall', config)
      .then(response => response.json())
      .then(response => {
        dispatch(receiveGetTaskWall(response))
      })
      .catch(handleHttpError)
  }
}


