import {
  TASKCARD_POST_REQUEST, TASKCARD_POST_SUCCESS, TASKCARD_POST_FAILURE,
  TASKCARD_PATCH_REQUEST, TASKCARD_PATCH_SUCCESS, TASKCARD_PATCH_FAILURE,
  TASKCARD_LEAVE_START, TASKCARD_LEAVE_DONE,
  TASKCARD_ENTER_START, TASKCARD_ENTER_DONE,
  TASKCARD_MOVE_REQUEST, TASKCARD_MOVE_SUCCESS, TASKCARD_MOVE_FAILURE
} from '../../actions/task/task-card';

function taskCard(state = {
  isFetching: false
}, action) {
  switch (action.type) {
  case TASKCARD_POST_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      taskCard: action.card
    })
    break;
  case TASKCARD_POST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      taskCard: action.card
    })
    break;
  case TASKCARD_POST_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    })
    break;

  case TASKCARD_PATCH_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;
  case TASKCARD_PATCH_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false
    })
    break;
  case TASKCARD_PATCH_FAILURE:
    return Object.assign({}, state, {
      isFetching: false
    })
    break;

  case TASKCARD_LEAVE_START:
  case TASKCARD_LEAVE_DONE:
  case TASKCARD_ENTER_START:
  case TASKCARD_ENTER_DONE:
    return Object.assign({}, state);
    
  default:
    return state;
  }
}

export default taskCard;
