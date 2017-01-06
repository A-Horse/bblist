import {
  TASKCARDCOMMENT_POST_REQUEST,
  TASKCARDCOMMENT_POST_SUCCESS,
  TASKCARDCOMMENT_POST_FAILURE
} from 'actions/task/task-card-comment';

function taskCardComment(state = {
  isFetching: false,
  active: false
}, action) {
  switch (action.type) {
  case TASKCARDCOMMENT_POST_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case TASKCARDCOMMENT_POST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false
    });
    break;
  case TASKCARDCOMMENT_POST_FAILURE:
    return Object.assign({}, state, {
      isFetching: false
    });
    break;
  
  default:
    return state;
  }
}
x
export default taskCardComment;
