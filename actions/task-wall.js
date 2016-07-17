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

function receiveGetTaskWall(walls) {
  return {
    type: TASKWALL_GET_SUCCESS,
    isFetching: false,
    walls: walls
  }
}

function getTaskWallError(message) {
  return {
    type: TASKWALL_GET_FAILURE,
    isFetching: false,
    message: message
  }
}


/************* Post *******************/
function requestCreateTaskWall() {
  return {
    type: TASKWALL_POST_REQUEST,
    isFetching: true
  }
}

function receiveCreateTaskWall() {
  return {
    type: TASKWALL_POST_SUCCESS,
    isFetching: false
  }
}

function createTaskWallError() {
  return {
    type: TASKWALL_POST_FAILURE,
    isFetching: false
  }
}

/************* Method *******************/

export function getAllTaskWall(user) {
  let config = {
    method: 'GET',
    headers: {
      'Content-Type':'application/json',
      'JWTs-TOKEN': localStorage.getItem('jwts-token')
    }
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

export function createTaskWall(wallInfo) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'JWTs-TOKEN': localStorage.getItem('jwts-token')
    },
    body: JSON.stringify(wallInfo)
  }

  return dispatch => {
    dispatch(requestCreateTaskWall())
    return fetch('/api/task-wall', config)
      .then(response => {
        if( response.status !== 201 ){
          dispatch(createTaskWallError(response.json().message))
        } else {
          dispatch(receiveCreateTaskWall(response.json()))
        }
      })
      .catch(handleHttpError)
  }
}
