import fetch from 'isomorphic-fetch';
import { createConfigWithAuth } from 'utils/header';
import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';
import { getCachedUserId } from 'utils/auth';
import { CACHED_USERID } from '../../constants';
import { makeApiUrl } from 'utils/api';

export const ACTIVE_TD_REPEAT_HISTORY = 'ACTIVE_TD_REPEAT_HISTORY';
export const UNACTIVE_TD_REPEAT_HISTORY = 'UNACTIVE_TD_REPEAT_HISTORY';

export function activeTdRepeatHistory(tdId) {
  return {
    type: ACTIVE_TD_REPEAT_HISTORY,
    playload: {tdId}
  };
}

export function unactiveTdRepeatHistory() {
  return {
    type: UNACTIVE_TD_REPEAT_HISTORY
  };
}

export const TD_REPEAT_HISTORY_REQUEST = 'TD_REPEAT_HISTORY_REQUEST';
export const TD_REPEAT_HISTORY_SUCCESS = 'TD_REPEAT_HISTORY_SUCCESS';
export const TD_REPEAT_HISTORY_FAILURE = 'TD_REPEAT_HISTORY_FAILURE';

export function tdRepeatHistoryRequest() {
  return {
    type: TD_REPEAT_HISTORY_REQUEST
  };
}

export function tdRepeatHistorySuccess(resp) {
  return {
    type: TD_REPEAT_HISTORY_SUCCESS,
    playload: resp
  };
}

export function tdRepeatHistoryFailure(error) {
  return {
    type: TD_REPEAT_HISTORY_FAILURE,
    playload: error,
    error: true
  };
}

export function getTodoRepeatHistory(todoId) {
  const config = createConfigWithAuth('GET');
  return dispatch => {
    dispatch(tdRepeatHistoryRequest());
    return fetch(makeApiUrl(`/ts/todo/${todoId}/history?limit=7`), config)
      .then(handleResponse)
      .then((resp) => dispatch(tdRepeatHistorySuccess(resp)))
      .catch((error) => dispatch(tdRepeatHistoryFailure(error)));
  };
}



export const TD_REPEAT_HISTORY_YESTORY_UPDATE_SUCCESS = 'TD_REPEAT_HISTORY_YESTORY_UPDATE_SUCCESS';
export const TD_REPEAT_HISTORY_YESTORY_UPDATE_FAILURE = 'TD_REPEAT_HISTORY_YESTORY_UPDATE_FAILURE';

export function tdRepeatHistoryYestoryUpdateSuccess(resp) {
  return {
    type: TD_REPEAT_HISTORY_YESTORY_UPDATE_SUCCESS,
    playload: resp
  };
}

export function tdRepeatHistoryYestoryUpdateFailure(error) {
  return {
    type: TD_REPEAT_HISTORY_YESTORY_UPDATE_FAILURE,
    playload: error,
    error: true
  };
}

export function tdRepeatHistoryYestoryUpdate(todoId, data) {
  const config = createConfigWithAuth('POST');
  return dispatch => {
    return fetch(makeApiUrl(`/ts/todo/${todoId}/history`), data, config)
      .then(handleResponseWithoutJson)
      .then((resp) => dispatch(tdRepeatHistorySuccess(resp)))
      .catch((error) => dispatch(tdRepeatHistoryFailure(error)));
  };
}
