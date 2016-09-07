import fetch from 'isomorphic-fetch';
import {createConfigWithAuth} from '../../utils/header';
import {handleResponse, handleResponseWithoutJson} from '../../utils/http-handle';

export const GOALLIST_GET_REQUEST = 'GOALLIST_GET_REQUEST';
export const GOALLIST_GET_SUCCESS = 'GOALLIST_GET_SUCCESS';
export const GOALLIST_GET_FAILURE = 'GOALLIST_GET_FAILURE';

function requestGoalList() {
  return {
    type: GOALLIST_GET_REQUEST
  }
}

function receiveGoalList(goals) {
  return {
    type: GOALLIST_GET_SUCCESS,
    goals
  }
}

function receiveGoalListError(message) {
  return {
    type: GOALLIST_GET_FAILURE,
    message: message
  }
}

export const GOAL_POST_REQUEST = 'GOAL_POST_REQUEST';
export const GOAL_POST_SUCCESS = 'GOAL_POST_SUCCESS';
export const GOAL_POST_FAILURE = 'GOAL_POST_FAILURE';

function requestCreatedGoal() {
  return {
    type: GOAL_POST_REQUEST
  };
}

function receiveCreatedGoal(goal) {
  return {
    type: GOAL_POST_SUCCESS,
    goal
  }
}

function createdGoalError(message) {
  return {
    type: GOAL_POST_FAILURE,
    message: message
  }
}

export const GOAL_DELETE_REQUEST = 'GOAL_DELETE_REQUEST'
export const GOAL_DELETE_SUCCESS = 'GOAL_DELETE_SUCCESS'
export const GOAL_DELETE_FAILURE = 'GOAL_DELETE_FAILURE'


function requestDestroyGoal() {
  return {
    type: GOAL_DELETE_REQUEST
  };
}

function receiveGoalDestroyed() {
  return {
    type: GOAL_DELETE_SUCCESS
  }
}

function destroyGoalError(message) {
  return {
    type: GOAL_DELETE_FAILURE,
    message: message
  }
}

export function deleteGoal(goalId) {
  const config = createConfigWithAuth('DELETE');
  return dispatch => {
    dispatch(requestDestroyGoal());
    return fetch(`/api/goal${goalId}`, config)
      .then(handleResponseWithoutJson)
      .then(() => dispatch(receiveGoalDestroyed()))
  };
}

export function createGoal(data) {
  const config = createConfigWithAuth('POST', data);
  return dispatch => {
    dispatch(requestCreatedGoal());
    return fetch('/api/goal', config)
      .then(handleResponse)
      .then(() => dispatch(receiveCreatedGoal()))
      .catch(() => {dispatch(createdGoalError())});
  };
}

export function getGoalList(userId) {
  const config = createConfigWithAuth('GET');
  return dispatch => {
    dispatch(requestCreatedGoal());
    return fetch(`/api/user/${userId}/goal`, config)
      .then(handleResponse)
      .then(response => dispatch(receiveGoalList(response)))
      .catch(error => dispatch(receiveGoalListError(error.message)));
  };
}
