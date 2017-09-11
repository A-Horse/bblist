import {
  TODOLIST_GET_REQUEST,
  TODOLIST_GET_SUCCESS,
  TODOLIST_GET_FAILURE,
  TODOBOX_GET_SUCCESS,
  TODOBOX_CREATE_SUCCESS,
  TODO_POST_SUCCESS,
  TODO_PATCH_SUCCESS,
  TODO_DESTORY_SUCCESS
} from 'actions/todo/todos';
import { TDBox, TD, TDS } from '../schema';
import { normalize } from 'normalizr';
import { Map, List, fromJS } from 'immutable';
import R from 'ramda';
import Actions from 'actions/actions';

function todos(
  state = fromJS({
    todoBoxId: null,
    todoIds: [],
    todoEntities: {}
  }),
  action
) {
  switch (action.type) {
    case Actions.ADD_TODO.SUCCESS:
      const addedTodo = action.playload;
      return state
        .update('todoEntities', todoEntities =>
          todoEntities.set(String(addedTodo.id), fromJS(addedTodo))
        )
        .update('todoIds', todoIds => todoIds.push(String(addedTodo.id)));
      break;

    case Actions.GET_TODOLIST.SUCCESS:
      const normalizedTodos = normalize(action.playload, TDS);

      return state
        .update('todoIds', () => List(normalizedTodos.result))
        .update('todoEntities', () => fromJS(normalizedTodos.entities.Todo || {}));
      break;

    case Actions.UPDATE_TODO.SUCCESS:
      return state.updateIn(['todoEntities', String(action.playload.id)], () =>
        fromJS(action.playload)
      );
      break;

    case Actions.DESTORY_TODO.SUCCESS:
      const toDeletedIndex = state.get('todoIds').indexOf(action.meta.id);
      return state.update('todoIds', ids => ids.delete(toDeletedIndex));
      break;

    case TODOBOX_GET_SUCCESS:
      const myTodoBox = { name: 'My Todo', id: null, type: 'only' };
      return {
        ...state,
        TodoBoxs: normalize([].concat(action.playload, myTodoBox), TDS).entities.TodoBox
      };
      break;

    case TODOBOX_CREATE_SUCCESS:
      normalize(action.playload, TD);
      return {
        ...state
      };
      break;

    default:
      return state;
  }
}

export default todos;
