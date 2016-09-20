import {
  TASKLIST_PATCH_REQUEST, TASKLIST_PATCH_SUCCESS, TASKLIST_PATCH_FAILURE,
  TASKLIST_POST_REQUEST, TASKLIST_POST_SUCCESS, TASKLIST_POST_FAILURE,
} from '../../actions/task/task-list';
import {normalize, Schema, arrayOf} from 'normalizr';

function taskList(state = {
  isFetching: false
}, action) {
  switch (action.type) {
  case TASKLIST_POST_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;
  case TASKLIST_POST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false
    })
    break;
  case TASKLIST_POST_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    })
    break;
    
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
    });
    break;
  case TASKLIST_PATCH_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    });
    break;
    
  default:
    return state;
  }
}

export default taskList;
