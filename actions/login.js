import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

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

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
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
    type: LOGIN_AUTH_FAILURE,
    isFetching: false,
    isAuthenticated: false
  }
}

function requestAuthLogin() {
  return {
    type: LOGIN_AUTH_REQUEST,
    isFetching: false,
    isAuthenticated: false
  }
}

function authLoginError(message) {
  return {
    type: LOGIN_AUTH_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message: message
  };
}

function authLoginSuccess(user) {
  return {
    type: LOGIN_AUTH_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    user: user
  };
}

export function loginUser(creds) {
  let config = {
    method: 'PUT',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(creds)
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('/api/login', config)
      .then(response => response.json())
      .then(response => {
        browserHistory.push('/foo')
        localStorage.setItem('id_token', response.id_token)
        localStorage.setItem('cachedUsername', response.user.username)
        return dispatch(receiveLogin({id_token: response.id_token, user: response.user}))
      })
      .catch(err => console.log("Error: ", err))
  }
}


export function authUser() {
  let token = localStorage.getItem('jwts-token');
  

  let config = {
    method: 'GET',
    headers: {'Content-Type':'application/json',
              'JWTs-TOKEN': token}
  };
  
  return dispatch => {
      if( !token ){
        return dispatch(canNotLoginAuth());
      }
      dispatch(requestAuthLogin());
      return fetch('/api/login', config)
        .then(response => {
          return response.json();
        }).then(response => {
          return dispatch(authLoginSuccess(response.user))
        }).catch(err => {
          return dispatch(authLoginError(err.message));
        });
    }
  
}
