import fetch from 'isomorphic-fetch';
import { createConfigWithAuth } from '../utils/header';
import { makeApiUrl } from 'utils/api';
import {handleResponse, handleResponseWithoutJson} from 'utils/http-handle';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

function requestUpdatePassword() {
  return  {
    type: UPDATE_PASSWORD_REQUEST
  };
}

function updatePasswordSuccess() {
  return {
    type: UPDATE_PASSWORD_SUCCESS
  };
}

function updatePasswordFail(message) {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    playload: message
  };
}

export function updatePassword(data) {
  const config = createConfigWithAuth('POST', data);
  return dispatch =>
    fetch(makeApiUrl('/user/update-password'), config)
    .then(handleResponseWithoutJson)
    .then(() => dispatch(updatePasswordSuccess()))
    .catch(updatePasswordFail());
}
