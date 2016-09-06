import fetch from 'isomorphic-fetch';
import {createConfigWithAuth} from '../utils/header';
import {handleResponseWithoutJson} from '../utils/http-handle';
import {makeApiUrl} from '../utils/api';

export const LOGOUT_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_FAILURE = 'LOGIN_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS
  }
}

function logoutError(message) {
  return {
    type: LOGOUT_FAILURE
  }
}

export function logout() {
  const config = createConfigWithAuth('POST');
  return dispatch => {
    dispatch(requestLogout());
    return fetch(makeApiUrl('/logout'), config)
      .then(handleResponseWithoutJson())
      .then(() => dispatch(receiveLogout()))
      .then(() => dispatch(logoutError()));
  };
}
