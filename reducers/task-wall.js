import {
  TASKWALL_GET_REQUEST,
  TASKWALL_GET_SUCCESS,
  TASKWALL_GET_FAILURE,

  TASKWALL_POST_REQUEST,
  TASKWALL_POST_SUCCESS,
  TASKWALL_POST_FAILURE,

  TASKWALL_DELETE_REQUEST,
  TASKWALL_DELETE_SUCCESS,
  TASKWALL_DELETE_FAILURE,

  ALL_TASKCARD_GET_REQUEST,
  ALL_TASKCARD_GET_SUCCESS,
  ALL_TASKCARD_GET_FAILURE
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

  case TASKWALL_DELETE_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;
  case TASKWALL_DELETE_SUCCESS:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;
  case TASKWALL_DELETE_FAILURE:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;

  case ALL_TASKCARD_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    })
    break;
  case ALL_TASKCARD_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      wallData: action.wallData
    })
    break;
  case ALL_TASKCARD_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      status: action.status
    })
    break;
    
  default:
    return state;
  }
}

export default taskWall
