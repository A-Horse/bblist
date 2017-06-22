import {
  TODOLIST_GET_REQUEST, TODOLIST_GET_SUCCESS, TODOLIST_GET_FAILURE,
  TODO_DESTORY_SUCCESS
} from 'actions/todo/todos';
import { TDS } from '../../schema';
import { normalize } from 'normalizr';

function todos(state = {
  isFetching: false,
  list: []
}, action) {
  switch (action.type) {
  case TODOLIST_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });

  case TODOLIST_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      list: action.playload,
      normalizedTodos: normalize(action.playload, TDS)
    });

  case TODOLIST_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.playload.message
    });

  case TODO_DESTORY_SUCCESS:
    return {
      ...state,

    };


  default:
    return state;
  }
}

export default todos;
