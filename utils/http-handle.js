import {
  NotAuthError,
  NotFoundError,
  RequestError,
  ServerError,
  UnprocessableError,
  UnKnownError,
  TimeoutError
} from './http-error';

function handleError(response) {
  switch (response.status) {
    case 404:
      throw new NotFoundError();
      break;
    case 401:
      throw new NotAuthError();
      break;
    case 400:
      throw new RequestError();
      break;
    case 422:
      throw new UnprocessableError();
      break;
    case 500:
      throw new ServerError();
      break;
    case 504:
      throw new TimeoutError();
    default:
      break;
  }
}

export function handleResponse(response) {
  handleError(response);
  let resp;

  if (response.status === 202 || response.status === 204) {
    return null;
  }
  return response.json();
}

export function handleResponseWithoutJson(response) {
  handleError(response);
  return null;
}
