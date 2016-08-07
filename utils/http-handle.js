'use strict';

import {NotAuthError, NotFoundError, RequestError, ServerError} from './http-error.js';

function handleError(response) {
  switch(response.status) {
  case 404:
    throw new NotFoundError();
    break;
  case 401:
    throw new NotAuthError();
    break;
  case 400:
    throw new RequestError();
    break;
  case 500:
    throw new ServerError();
    break;
  default:
    break;
  }
}

export function handleResponse(response) {
  handleError(response);
  return response.json();
}

export function handleResponseWithJson(response) {
  handleError(response);
  return null;
}
