import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

import { handleHttpError } from '../services/handle-error'

export const TASKCARD_POST_REQUEST = 'TASKCARD_POST_REQUEST'
export const TASKCARD_POST_SUCCESS = 'TASKCARD_POST_SUCCESS'
export const TASKCARD_POST_FAILURE = 'TASKCARD_POST_FAILURE'

export const TASKCARD_GET_REQUEST = 'TASKCARD_GET_REQUEST'
export const TASKCARD_GET_SUCCESS = 'TASKCARD_GET_SUCCESS'
export const TASKCARD_GET_FAILURE = 'TASKCARD_GET_FAILURE'

/************* Post *******************/

function requestPostTaskCard(taskCard) {
  return {
    type: TASKCARD_POST_REQUEST,
    isFetching: true,
    taskCard
  }
}

function receivePostTaskCard(taskCard) {
  return {
    type: TASKCARD_POST_SUCCESS,
    isFetching: false,
    taskCard: taskCard
  }
}

function postTaskCardError(message) {
  return {
    type: TASKCARD_POST_FAILURE,
    isFetching: false,
    message
  }
}

/************* Get *******************/

function requestGetTaskCard() {
  return {
    type: TASKCARD_GET_REQUEST,
    isFetching: true
  }
}

function receiveGetTaskCard() {
  return {
    type: TASKCARD_POST_SUCCESS,
    isFetching: false
  }
}

function getTaskCardError() {
  return {
    type: TASKCARD_GET_FAILURE,
    isFetching: false
  }
}

export function getTask(user, wallId) {
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json' },
    body: {}
  }

  return dispatch => {
    dispatch(requestGetTaskCard())
    return fetch(`/api/task-card/${wallId}`, config)
      .then(response => response.json)
      .then(response => {
        dispatch(receiveGetTaskCard())
      })
      .catch(handleHttpError)
  }
}


export function postTaskCard(taskCard) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: taskCard
  }
  
  return dispatch => {
    dispatch(requestPostTaskCard(taskCard))
    return fetch('/api/task-card', config)
      .then(response => response.json())
      .then(response => {
        dispatch(receivePostTaskCard(response))
      })
      .catch(handleHttpError)
  }
}
