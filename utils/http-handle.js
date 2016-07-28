'use strict';

import {NotAuthError, NotFoundError, RequestError} from './http-error.js';

export function handleResponse(response) {

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
  }
  
  return response.json();
}
