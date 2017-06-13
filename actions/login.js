import fetch from 'isomorphic-fetch';
import { createConfigWithAuth, createConfig } from 'utils/header';
import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';
import { getJWT} from 'utils/auth';
import { makeApiUrl } from 'utils/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(token, user) {
  return {
    type: LOGIN_SUCCESS,
    jwt: token,
    user
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

function canNotLoginAuth() {
  return {
    type: AUTH_FAILURE
  };
}

function requestAuthLogin() {
  return {
    type: AUTH_REQUEST
  };
}

function authLoginError(playload) {
  return {
    type: AUTH_FAILURE,
    playload
  };
}

function authLoginSuccess(user) {
  return {
    type: AUTH_SUCCESS,
    user: user
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

export function authUser() {
  const token = getJWT();
  const config = createConfigWithAuth('GET');
  return dispatch => {
    if (!token) return dispatch(canNotLoginAuth());
    dispatch(requestAuthLogin());
    return fetch(makeApiUrl(`/signin?t=${new Date().getTime()}`), config)
      .then(handleResponse)
      .then(response => dispatch(authLoginSuccess(response)))
      .catch(err => dispatch(authLoginError(err.message)));
  };
}
