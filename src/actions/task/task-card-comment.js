import fetch from 'isomorphic-fetch';
import { getAuthData } from 'utils/auth';
import { handleHttpError } from '../../services/handle-error';
import { createConfigWithAuth } from '../../utils/header';
import { handleResponse, handleResponseWithoutJson } from '../../utils/http-handle';
import { makeApiUrl } from '../../utils/api';

export const TASKCARDCOMMENT_POST_REQUEST = 'TASKCARDCOMMENT_POST_REQUEST';
export const TASKCARDCOMMENT_POST_SUCCESS = 'TASKCARDCOMMENT_POST_SUCCESS';
export const TASKCARDCOMMENT_POST_FAILURE = 'TASKCARDCOMMENT_POST_FAILURE';

function requestCreateTaskCardComment() {
  return {
    type: TASKCARDCOMMENT_POST_REQUEST
  };
}

function createTaskCardCommentSucceess(comment) {
  return {
    type: TASKCARDCOMMENT_POST_SUCCESS,
    playload: comment
  };
}

function createTaskCardCommentError(error) {
  return {
    type: TASKCARDCOMMENT_POST_FAILURE,
    playload: error,
    error: true
  };
}

export function createTaskCardComment(taskCardId, comment) {
  const config = createConfigWithAuth('POST', comment);
  return dispatch => {
    dispatch(requestCreateTaskCardComment());
    return fetch(makeApiUrl(`/task-card/${taskCardId}/comment`), config)
      .then(handleResponse)
      .then(() => dispatch(createTaskCardCommentSucceess()))
      .catch(() => dispatch(createTaskCardCommentError()));
  };
}
