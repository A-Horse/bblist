import fetch from 'isomorphic-fetch';
import { createConfigWithAuth, createConfig } from 'utils/header';
import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';
import { getJWT } from 'utils/auth';
import { makeApiUrl } from 'utils/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const IDENTIFY_FAILURE = 'IDENTIFY_FAILURE';
export const IDENTIFY_REQUEST = 'IDENTIFY_REQUEST';
export const IDENTIFY_SUCCESS = 'IDENTIFY_SUCCESS';

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
    playload: { jwt, user }
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

function canNotLoginAuth() {
  return {
    type: IDENTIFY_FAILURE
  };
}

function requestAuthLogin() {
  return {
    type: IDENTIFY_REQUEST
  };
}

function authLoginError(playload) {
  return {
    type: IDENTIFY_FAILURE,
    playload
  };
}

function authLoginSuccess(user) {
  return {
    type: IDENTIFY_SUCCESS,
    user: user
  };
}

export function indentifyUser() {
  // const token = getJWT();
  const config = createConfigWithAuth('GET');
  return dispatch => {
    if (!token) return dispatch(canNotLoginAuth());
    dispatch(requestAuthLogin());
    return fetch(makeApiUrl(`/user/identify`), config)
      .then(handleResponse)
      .then(response => dispatch(authLoginSuccess(response)))
      .catch(err => dispatch(authLoginError(err)));
  };
}

export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

function authRequest() {
  return {
    type: AUTH_REQUEST
  };
}

function authSuccess(resp) {
  return {
    type: AUTH_SUCCESS,
    playload: resp
  };
}

function authFailure(message) {
  return {
    type: AUTH_FAILURE,
    playload: message
  };
}

export function authUser(userId) {
  const config = createConfigWithAuth('GET');
  return dispatch => {
    return fetch(makeApiUrl(`/user/${userId}`), config)
      .then(handleResponse)
      .then(response => dispatch(authSuccess(response)))
      .catch(err => dispatch(authFailure(err.message)));
  };
}
