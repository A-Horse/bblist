import fetch from 'isomorphic-fetch';
import { handleHttpError } from '../services/handle-error';
export const TASKCARD_POST_REQUEST = 'TASKCARD_POST_REQUEST';
export const TASKCARD_POST_SUCCESS = 'TASKCARD_POST_SUCCESS';
export const TASKCARD_POST_FAILURE = 'TASKCARD_POST_FAILURE';
import {JWT_STORAGE_KEY} from '../constants';

/************* Post *******************/

function requestPostTaskCard(taskCard) {
  return {
    type: TASKCARD_POST_REQUEST,
    taskCard
  }
}

function receivePostTaskCard(taskCard) {
  return {
    type: TASKCARD_POST_SUCCESS,
    taskCard: taskCard
  }
}

function postTaskCardError(message) {
  return {
    type: TASKCARD_POST_FAILURE,
    message
  }
}




export function postTaskCard(taskCard) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'jwts-token': localStorage.getItem(JWT_STORAGE_KEY)
    },
    body: JSON.stringify(taskCard)
  }
  
  return dispatch => {
    dispatch(requestPostTaskCard(taskCard))
    return fetch('/api/task-card', config)
      .then(response => dispatch(receivePostTaskCard(response.json())))
      .catch(handleHttpError)
  }
}
