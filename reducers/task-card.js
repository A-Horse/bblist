import { combineReducers } from 'redux'
import {
  TASKCARD_POST_REQUEST, TASKCARD_POST_SUCCESS, TASKCARD_POST_FAILURE,
  TASKCARD_GET_REQUEST, TASKCARD_GET_SUCCESS, TASKCARD_GET_FAILURE
} from '../actions/task-card';

function taskCard(state = {
  isFetching: false
}, action) {
  switch (action.type) {
  case TASKCARD_POST_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      taskCard: action.taskCard
    })
    break;
  case TASKCARD_POST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      taskCard: action.taskCard
    })
    break;
  case TASKCARD_POST_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    })
    break;

  case TASKCARD_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;
  case TASKCARD_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      wallData: action.wallData
    })
    break;
  case TASKCARD_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      status: action.status
    })
    break;

  default:
    return state;
  }
}

export default taskCard
