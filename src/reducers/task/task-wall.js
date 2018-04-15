import {
  TASKWALL_GET_REQUEST,
  TASKWALL_GET_SUCCESS,
  TASKWALL_GET_FAILURE,
  TASKWALL_DELETE_REQUEST,
  TASKWALL_DELETE_SUCCESS,
  TASKWALL_DELETE_FAILURE,
  ALL_TASKCARD_GET_REQUEST,
  ALL_TASKCARD_GET_SUCCESS,
  ALL_TASKCARD_GET_FAILURE,
  TASKBOARD_PATCH_SUCCESS
} from 'actions/task/task-wall';

import { normalize } from 'normalizr';
import { CLEAR_BOARD } from 'actions/task/task';

import { Boards } from 'schema';

function taskWall(
  state = {
    entities: [],
    result: [],
    isTaskBoardsFetching: true
  },
  action
) {
  switch (action.type) {
    case TASKWALL_GET_REQUEST:
      return Object(state, { isTaskBoardsFetching: true });
      break;

    case TASKWALL_GET_SUCCESS:
      return {
        ...state,
        isTaskBoardsFetching: false,
        ...normalize(action.payload, Boards)
      };

    case TASKWALL_DELETE_SUCCESS:
      return Object.assign({}, state, {});
      break;

    case ALL_TASKCARD_GET_SUCCESS:
      return Object.assign({}, state, {
        // isFetching: false,
        // TODO merge not cover
        entities: action.payload.entities.board
      });

    case CLEAR_BOARD:
      return Object.assign({}, state, {
        entities: [],
        result: []
      });
      break;

    case TASKBOARD_PATCH_SUCCESS:
      return Object.assign({}, state, normalize(action.payload, Boards));

    default:
      return state;
  }
}

export default taskWall;
