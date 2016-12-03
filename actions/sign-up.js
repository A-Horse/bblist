import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';
import {createConfigWithAuth, createConfig} from '../utils/header';
import {handleHttpError} from '../services/handle-error';
import {makeApiUrl} from 'utils/api';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

function requestSignUp(userInfo) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    userInfo
  };
}

function receiveSignUp() {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false
  };
}

function signUpError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    message: message
  };
}

export function signUp(userInfo){
  const config = createConfig('POST', userInfo);
  return dispatch => {
    dispatch(requestSignUp(userInfo));
    return fetch(makeApiUrl('/signup'), config)
      .then(response => {
        localStorage.setItem('jwts-token', response.headers.get('jwts-token'));
        return receiveSignUp(response.json());
      }).catch(handleHttpError);
  };
}

