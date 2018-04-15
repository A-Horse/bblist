import fetch from 'isomorphic-fetch';
import { handleHttpError } from 'services/handle-error';
import { createConfigWithAuth, createConfig, createFormDataConfigWithAuth } from 'utils/header';
import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';
import { Storage } from 'services/storage';
import { getJWT } from 'utils/auth';
import { makeApiUrl } from 'utils/api';

export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

function requestUploadFile() {
  return {
    type: UPLOAD_FILE_REQUEST
  };
}

function uploadFileSuccess() {
  return {
    type: UPLOAD_FILE_SUCCESS
  };
}

function uploadFileFail(error) {
  return {
    type: UPLOAD_FILE_FAILURE,
    error: true,
    payload: error
  };
}

export function uploadFile(url, data) {
  const config = createFormDataConfigWithAuth('PUT', data);
  return dispatch => {
    dispatch(requestUploadFile());
    return fetch(makeApiUrl(url), config)
      .then(handleResponse)
      .then(() => dispatch(uploadFileSuccess()))
      .then(() => dispatch(uploadFileFail()));
  };
}
