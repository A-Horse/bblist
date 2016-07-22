import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

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
        return dispatch(receiveLogin({id_token: response.id_token, user: response.user}))
      })
      .catch(err => console.log("Error: ", err))
  }
}
