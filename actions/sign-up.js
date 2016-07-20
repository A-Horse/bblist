import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

import { handleHttpError } from '../services/handle-error'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

function requestSignUp(userInfo) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    userInfo
  }
}

function receiveSignUp() {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false
  }
}

function signUpError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    message: message
  }
}

export function signUp(userInfo){
  let config = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(userInfo)
  }

  return dispatch => {
    dispatch(requestSignUp(userInfo))
    return fetch('/api/sign-up', config)
      .then(response => {
        localStorage.setItem('jwts-token', response.headers.get('jwts-token'));
        return receiveSignUp(response.json());
      }).catch(handleHttpError);
  }
}

