import fetch from 'isomorphic-fetch';
import {createConfigWithAuth} from 'utils/header';
import {handleResponse, handleResponseWithoutJson} from 'utils/http-handle';
import {getAuthData} from 'utils/auth';
import {CACHED_USERID} from 'constants';
import {makeApiUrl} from 'utils/api';

export const GOALLIST_GET_REQUEST = 'GOALLIST_GET_REQUEST';
export const GOALLIST_GET_SUCCESS = 'GOALLIST_GET_SUCCESS';
export const GOALLIST_GET_FAILURE = 'GOALLIST_GET_FAILURE';

function requestGoalList() {
  return {
    type: GOALLIST_GET_REQUEST
  };
}

function receiveGoalList(goals) {
  return {
    type: GOALLIST_GET_SUCCESS,
    goals
  };
}

function receiveGoalListError(message) {
  return {
    type: GOALLIST_GET_FAILURE,
    message: message
  };
}

export const GOAL_POST_REQUEST = 'GOAL_POST_REQUEST';
export const GOAL_POST_SUCCESS = 'GOAL_POST_SUCCESS';
export const GOAL_POST_FAILURE = 'GOAL_POST_FAILURE';

function requestCreatedGoal() {
  return {
    type: GOAL_POST_REQUEST
  };
}

function createdGoalSucceess(goal) {
  return {
    type: GOAL_POST_SUCCESS,
    playload: goal
  };
}

function createdGoalError(error) {
  return {
    type: GOAL_POST_FAILURE,
    playload: error,
    error: true
  };
}

export const GOAL_DELETE_REQUEST = 'GOAL_DELETE_REQUEST';
export const GOAL_DELETE_SUCCESS = 'GOAL_DELETE_SUCCESS';
export const GOAL_DELETE_FAILURE = 'GOAL_DELETE_FAILURE';

function requestDestroyGoal(id) {
  return {
    type: GOAL_DELETE_REQUEST,
    playload: id
  };
}

function destroyGoalSuccess() {
  return {
    type: GOAL_DELETE_SUCCESS
  };
}

function destroyGoalError(error) {
  return {
    type: GOAL_DELETE_FAILURE,
    error: true,
    playload: error
  };
}

export function deleteGoal(goalId) {
  const config = createConfigWithAuth('DELETE');
  return dispatch => {
    dispatch(requestDestroyGoal());
    return fetch(makeApiUrl(`/goal${goalId}`), config)
      .then(handleResponseWithoutJson)
      .then(() => dispatch(destroyGoalSuccess()))
      .catch(error => dispatch(destroyGoalError(error)));
  };
}

export function createGoal(data) {
  const config = createConfigWithAuth('POST', data);
  return dispatch => {
    dispatch(requestCreatedGoal());
    return fetch('/api/goal', config)
      .then(handleResponse)
      .then(() => dispatch(createdGoalSucceess()))
      .catch(() => dispatch(createdGoalError()));
  };
}

export function getGoalList() {
  const config = createConfigWithAuth('GET');
  const userId = getAuthData(CACHED_USERID);
  return dispatch => {
    dispatch(requestCreatedGoal());
    return fetch(`/api/user/${userId}/goal`, config)
      .then(handleResponse)
      .then(response => dispatch(receiveGoalList(response)))
      .catch(error => dispatch(receiveGoalListError(error.message)));
  };
}
