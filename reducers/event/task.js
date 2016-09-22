import {
  TASKCARD_LEAVE_START, TASKCARD_LEAVE_DONE,
  TASKCARD_ENTER_START, TASKCARD_ENTER_DONE,
  TASKCARD_MOVE_REQUEST, TASKCARD_MOVE_SUCCESS, TASKCARD_MOVE_FAILURE
} from '../../actions/task/task-card';

function body(state = {

}, action) {
  switch (action.type) {
  case TASKCARD_ENTER_START:
    break;
  default:
    return state;
  }
}

export default body;
