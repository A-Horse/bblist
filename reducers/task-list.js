import { combineReducers } from 'redux'
import {
  TASKLIST_PATCH_REQUEST, TASKLIST_PATCH_SUCCESS, TASKLIST_PATCH_FAILURE,
} from '../actions/task-list';

function taskList(state = {
  isFetching: false
}, action) {
  switch (action.type) {
  case TASKLIST_PATCH_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      taskCard: action.taskCard
    })
    break;
  case TASKLIST_PATCH_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      taskList: action.taskList
    })
    break;
  case TASKLIST_PATCH_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    })
    break;

  default:
    return state;
  }
}

export default taskList;
