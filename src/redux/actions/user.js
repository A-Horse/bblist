import fetch from 'isomorphic-fetch';
import { createConfigWithAuth } from '../../utils/header';
import { makeApiUrl } from 'utils/api';
import {
  handleResponse,
  handleResponseWithoutJson,
} from '../../utils/http-handle';
import { authUser } from './login';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

function requestUpdatePassword() {
  return {
    type: UPDATE_PASSWORD_REQUEST,
  };
}

function updatePasswordSuccess() {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
  };
}

function updatePasswordFail(message) {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    payload: message,
  };
}

export function updatePassword(data) {
  const config = createConfigWithAuth('POST', data);
  return (dispatch) =>
    fetch(makeApiUrl('/user/update-password'), config)
      .then(handleResponseWithoutJson)
      .then(() => dispatch(updatePasswordSuccess()))
      .catch(updatePasswordFail());
}

export const UPDATE_USERINFO_REQUEST = 'UPDATE_USERINFO_REQUEST';
export const UPDATE_USERINFO_SUCCESS = 'UPDATE_USERINFO_SUCCESS';
export const UPDATE_USERINFO_FAILURE = 'UPDATE_USERINFO_FAILURE';

function requestUserInfoPassword() {
  return {
    type: UPDATE_PASSWORD_REQUEST,
  };
}

function updateUserInfoSuccess(user) {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    payload: user,
  };
}

function updateUserInfoFail(message) {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    payload: message,
  };
}

export function updateUserInfo(userId, data) {
  const config = createConfigWithAuth('PATCH', data);
  return (dispatch) =>
    fetch(makeApiUrl(`/user/${userId}`), config)
      .then(handleResponse)
      .then((user) => {
        return Promise.all([
          dispatch(updateUserInfoSuccess(user)),
          dispatch(authUser(userId)),
        ]);
      })
      .catch(updateUserInfoFail());
}
