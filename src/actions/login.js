import fetch from 'isomorphic-fetch';
import { createConfig } from '../utils/header';
import { handleResponse } from '../utils/http-handle';
import { makeApiUrl } from 'utils/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(jwt, user) {
  return {
    type: LOGIN_SUCCESS,
    payload: { jwt, user }
  };
}

function loginFail(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

export function signin(creds) {
  const config = createConfig('POST', creds);
  return dispatch => {
    dispatch(requestLogin(creds));
    return fetch(makeApiUrl('/signin'), config)
      .then(handleResponse)
      .then(response => dispatch(receiveLogin(response.jwt, response.user)))
      .catch(error => {
        if (error.name === 'NotAuthError') {
          return dispatch(loginFail('Email or password not match!'));
        }
        return dispatch(loginFail(error.message));
      });
  };
}
