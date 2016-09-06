import fetch from 'isomorphic-fetch';
import {handleHttpError} from '../services/handle-error';
import {createConfigWithAuth, createConfig} from '../utils/header';
import {handleResponse, handleResponseWithoutJson} from '../utils/http-handle';
import {Storage} from '../services/storage';
import {getJWT} from '../utils/auth';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGIN_AUTH_FAILURE = 'LOGIN_AUTH_FAILURE';
export const LOGIN_AUTH_REQUEST = 'LOGIN_AUTH_REQUEST';
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(token, user) {
  return {
    type: LOGIN_SUCCESS,
    jwt: token,
    user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function canNotLoginAuth() {
  return {
    type: LOGIN_AUTH_FAILURE
  }
}

function requestAuthLogin() {
  return {
    type: LOGIN_AUTH_REQUEST
  }
}

function authLoginError(message) {
  return {
    type: LOGIN_AUTH_FAILURE,
    message: message
  };
}

function authLoginSuccess(user) {
  return {
    type: LOGIN_AUTH_SUCCESS,
    user: user
  };
}

export function loginedUser(creds) {
  const config = createConfig('POST', creds);
  return dispatch => {
    dispatch(requestLogin(creds));
    return fetch('/api/login', config)
      .then(handleResponse)
      .then(response => {        
        return dispatch(receiveLogin(response.jwt, response.user))
      })
  }
}


export function authUser() {
  const token = Storage.get(getJWT());
  const config = createConfigWithAuth('GET')
  
  return dispatch => {
    if( !token ){
      return dispatch(canNotLoginAuth());
    }
    dispatch(requestAuthLogin());
    return fetch('/api/login', config)
      .then(handleResponse)
      .then(response => {
        return dispatch(authLoginSuccess(response));
      }).catch(err => {
        return dispatch(authLoginError(err.message));
      });
  }  
}
