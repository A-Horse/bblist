import fetch from 'isomorphic-fetch';
import {createConfigWithAuth} from 'utils/header';
import {handleResponse, handleResponseWithoutJson} from 'utils/http-handle';
import {getAuthData} from 'utils/auth';
import {CACHED_USERID} from 'constants';

export const TODOLIST_GET_REQUEST = 'TODOLIST_GET_REQUEST';
export const TODOLIST_GET_SUCCESS = 'TODOLIST_GET_SUCCESS';
export const TODOLIST_GET_FAILURE = 'TODOLIST_GET_FAILURE';

function requestTodoList() {
  return {
    type: GOALLIST_GET_REQUEST
  };
}

function receiveTodoList(todos) {
  return {
    type: GOALLIST_GET_SUCCESS,
    todos
  };
}

function receiveTodoListError(error) {
  return {
    type: GOALLIST_GET_FAILURE,
    error: true,
    playload: error
  };
}

export function getTodoList() {
  const config = createConfigWithAuth('GET');
  const userId = getAuthData(CACHED_USERID);
  return dispatch => {
    dispatch(requestTodoList());
    return fetch(`/api/user/${userId}/todo`, config)
      .then(handleResponse)
      .then(response => dispatch(receiveTodoList(response)))
      .catch(error => dispatch(receiveTodoListError(error.message)));
  };
}
