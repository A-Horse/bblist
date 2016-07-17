
import {
  TASKWALL_GET_REQUEST,
  TASKWALL_GET_SUCCESS,
  TASKWALL_GET_FAILURE,

  TASKWALL_POST_REQUEST,
  TASKWALL_POST_SUCCESS,
  TASKWALL_POST_FAILURE
} from '../actions/task-wall'

function taskWall(state = {
  isFetching: false
}, action) {
  switch ( action.type ) {
  case TASKWALL_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;
  case TASKWALL_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: true,
      walls: action.walls
    })
    break;
  case TASKWALL_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;
  default:
    return state;
  }
}

export default taskWall
