import {
  TODOLIST_GET_REQUEST, TODOLIST_GET_SUCCESS, TODOLIST_GET_FAILURE,
  TODOBOX_GET_SUCCESS,
  TODOBOX_CREATE_SUCCESS,
  TODO_POST_SUCCESS,
  TODO_PATCH_SUCCESS,
  TODO_DESTORY_SUCCESS
} from 'actions/todo/todos';
import { TDBox, TD, TDS } from '../../schema';
import { normalize } from 'normalizr';
import R from 'ramda';

function todos(state = {
  isFetching: false,
  todoBoxId: null,
  list: [],
  entities: {}
}, action) {
  switch (action.type) {
  case TODOBOX_GET_SUCCESS:
    const myTodoBox = {name: 'My Todo', id: null, type: 'only'};
    return {
      ...state,
      TodoBoxs: normalize([].concat(action.playload, myTodoBox), TDS).entities.TodoBox
    };

  case TODOBOX_CREATE_SUCCESS:
    normalize(action.playload, TD);
    return {
      ...state
    };

  case TODOLIST_GET_SUCCESS:
    const mockedTodoBoxs = {id: action.meta.todoBoxId, todos: action.playload};
    return {
      ...state,
      // TODO bug
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
    const tdDeteledState = R.clone(state, true);
    const newTodosResult = R.without([action.playload.todoId], tdDeteledState.entities.TodoBox[state.todoBoxId].todos);
    tdDeteledState.entities.TodoBox[state.todoBoxId].todos = newTodosResult;
    return tdDeteledState;

  case TODO_PATCH_SUCCESS:
    const updatedTodoState = R.clone(state, true);
    updatedTodoState.entities.Todo[action.playload.id] = action.playload;
    return updatedTodoState;

  default:
    return state;
  }
}

export default todos;
