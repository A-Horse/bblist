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

function receiveGetTaskCard(taskCards) {
  return {
    type: TASKCARD_GET_SUCCESS,
    isFetching: false,
    cards: taskCards
  }
}

function getTaskCardError(status) {
  return {
    type: TASKCARD_GET_FAILURE,
    isFetching: false,
    status: status
  }
}

export function getTaskCards(wallId) {
  let config = {
    method: 'GET',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'jwts-token': localStorage.getItem('jwts-token')
    }
  }

  return dispatch => {
    dispatch(requestGetTaskCard())
    return fetch(`/api/task-wall/${wallId}`, config)
      .then(response => response)
      .then(response => {
        if( response.status === 404 ){
          return dispatch(getTaskCardError(404))
        }
        response.json().then(response => dispatch(receiveGetTaskCard(response)))
      })
      .catch(handleHttpError)
  }
}


export function postTaskCard(taskCard) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'jwts-token': localStorage.getItem('jwts-token')
    },
    body: JSON.stringify(taskCard)
  }
  
  return dispatch => {
    dispatch(requestPostTaskCard(taskCard))
    return fetch('/api/task-card', config)
      .then(response => {
        return dispatch(receivePostTaskCard(response.json()))
      })
      .catch(handleHttpError)
  }
}
