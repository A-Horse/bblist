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

  case TODOLIST_GET_SUCCESS:
    const mockedTodoBoxs = {id: action.meta.todoBoxId, todos: action.playload};
    return {
      ...state,
      entities: normalize(mockedTodoBoxs, TDBox).entities
    };

  case TODO_POST_SUCCESS:
    return {
      ...state,
      entities: {
        ...state.entities,
        ...R.mergeDeepWith(
          R.concat,
          R.assocPath(
            ['TodoBox', JSON.stringify(state.todoBoxId), 'todos'],
            [].concat(state.entities.TodoBox[state.todoBoxId].todos, [action.playload.id]),
            {}
          ),
          R.assocPath(
            ['Todo'],
            R.assoc(action.playload.id, action.playload, state.entities.Todo),
            {}
          ))
      }
    };

  case TODO_DESTORY_SUCCESS:
    const newState = R.clone(state, true);
    const newTodosResult = R.without([action.playload.todoId], newState.entities.TodoBox[state.todoBoxId].todos);
    newState.entities.TodoBox[state.todoBoxId].todos = newTodosResult;
    // TODO R.assocPath
    return newState;

  default:
    return state;
  }
}

export default todos;
