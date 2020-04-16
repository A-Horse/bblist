import { FSAction } from '../actions';

export const DELETE_COLUMN_REQUEST = 'DELETE_COLUMN_REQUEST';
export const DELETE_COLUMN_SUCCESS = 'DELETE_COLUMN_SUCCESS';
export const DELETE_COLUMN_FAILURE = 'DELETE_COLUMN_FAILURE';

export function deleteColumnRequest(payload: {
  columnID: string;
}): FSAction {
  return {
    type: DELETE_COLUMN_REQUEST,
    payload
  };
}

export function deleteColumnSuccess(payload: {
}): FSAction {
  return {
    type: DELETE_COLUMN_SUCCESS,
  };
}

export function deleteColumnFailure(): FSAction {
  return {
    type: DELETE_COLUMN_FAILURE,
    error: true
  };
}
