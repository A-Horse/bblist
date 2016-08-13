import fetch from 'isomorphic-fetch';
import { handleHttpError } from '../services/handle-error';


export const TASKCOL_POST_REQUEST = 'TASKCOL_POST_REQUEST'
export const TASKCOL_POST_SUCCESS = 'TASKCOL_POST_SUCCESS'
export const TASKCOL_POST_FAILURE = 'TASKCOL_POST_FAILURE'

/************* Post *******************/
function requestGetTaskWall(user) {
  return {
    type: TASKCOL_POST_REQUEST,
    isFetching: true
    // user_id_jwt
  }
}

function receiveGetTaskWall() {
  return {
    type: TASKCOL_POST_SUCCESS,
    isFetching: false
  }
}

function getTaskWallError(message) {
  return {
    type: TASKCOL_POST_FAILURE,
    isFetching: false,
    message: message
  }
}



export function postAllTaskCol(user, wallId, taskCol) {
  let config = {
    method: 'POST',
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


