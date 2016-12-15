import {
  TASKWALL_GET_REQUEST, TASKWALL_GET_SUCCESS, TASKWALL_GET_FAILURE,
  TASKWALL_DELETE_REQUEST, TASKWALL_DELETE_SUCCESS, TASKWALL_DELETE_FAILURE,
  ALL_TASKCARD_GET_REQUEST, ALL_TASKCARD_GET_SUCCESS, ALL_TASKCARD_GET_FAILURE
} from 'actions/task/task-wall';

import {CLEAR_BOARD} from 'actions/task/task';

function taskWall(state = {
  isFetching: false,
  entities: [],
  result: []
}, action) {
  switch (action.type) {
  case TASKWALL_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case TASKWALL_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: true,
      entities: action.playload.entities.board,
      result: action.playload.result
    });
    break;
  case TASKWALL_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;

  case TASKWALL_DELETE_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case TASKWALL_DELETE_SUCCESS:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case TASKWALL_DELETE_FAILURE:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;

  case ALL_TASKCARD_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case ALL_TASKCARD_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      entities: action.playload.entities.board
    });
    break;
  case ALL_TASKCARD_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      status: action.status
    });
    break;

  case CLEAR_BOARD:
    return Object.assign({}, state, {
      entities: [],
      result: []
    });
    break;
    
  default:
    return state;
  }
}

export default taskWall;
