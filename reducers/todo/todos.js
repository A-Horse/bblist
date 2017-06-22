import {
  TODOLIST_GET_REQUEST, TODOLIST_GET_SUCCESS, TODOLIST_GET_FAILURE,
  TODO_POST_SUCCESS,
  TODO_DESTORY_SUCCESS
} from 'actions/todo/todos';
import { TDBox, TD } from '../../schema';
import { normalize } from 'normalizr';
import R from 'ramda';

function todos(state = {
  isFetching: false,
  todoBoxId: null,
  list: [],
  entities: {}
}, action) {
  switch (action.type) {
  case TODOLIST_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });

  case TODOLIST_GET_SUCCESS:
    const mockedTodoBoxs = {id: action.meta.todoBoxId, todos: action.playload};
    return Object.assign({}, state, {
      isFetching: false,
      list: action.playload,
      entities: normalize(mockedTodoBoxs, TDBox).entities
    });

  case TODOLIST_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.playload.message
    });

  case TODO_POST_SUCCESS:
    const normalizedTodo = normalize(action.playload, TD);
    return {
      ...state,
      entities: R.mergeDeepLeft({}, state.entities, normalizedTodo.entities)
    };

  case TODO_DESTORY_SUCCESS:
    console.log();
    return {
      ...state,
    };

  default:
    return state;
  }
}

export default todos;
