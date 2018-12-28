//
import { TDBox, TDS, TDBoxs } from '../schema';
import { normalize } from 'normalizr';
import { List, fromJS } from 'immutable';
import Actions from '../actions/actions';

export function todos(
  state = fromJS({
    todoBoxId: null,
    todoIds: [],
    todoEntities: {},
    todoBoxEntities: {},
    todoBoxIds: []
  }),
  action
) {
  switch (action.type) {
    case Actions.ADD_TODO.SUCCESS:
      const addedTodo = action.payload;
      return state
        .update('todoEntities', todoEntities =>
          todoEntities.set(String(addedTodo.id), fromJS(addedTodo))
        )
        .update('todoIds', todoIds => todoIds.push(String(addedTodo.id)));

    case Actions.GET_TODOLIST.REQUEST:
      return state.update('todoIds', () => fromJS([]));

    case Actions.GET_TODOLIST.SUCCESS:
      const normalizedTodos = normalize(action.payload, TDS);
      return state
        .update('todoIds', () => List(normalizedTodos.result))
        .update('todoEntities', () => fromJS(normalizedTodos.entities.Todo || {}));

    case Actions.UPDATE_TODO.SUCCESS:
      return state.updateIn(['todoEntities', String(action.payload.id)], () =>
        fromJS(action.payload)
      );

    case Actions.DESTORY_TODO.SUCCESS:
      const toDeletedIndex = state.get('todoIds').indexOf(action.meta.id);
      return state.update('todoIds', ids => ids.delete(toDeletedIndex));

    case Actions.ADD_TODOBOX.SUCCESS:
      const normalizedAddedTodoBox = normalize(action.payload, TDBox);
      return state
        .update('todoBoxEntities', todoBoxEntities =>
          todoBoxEntities.merge(normalizedAddedTodoBox.entities.TodoBox)
        )
        .update('todoBoxIds', todoBoxIds => todoBoxIds.push(normalizedAddedTodoBox.result));

    case Actions.GET_TODOBOXS.SUCCESS:
      const normalizeTodoBox = normalize(action.payload, TDBoxs);
      return state
        .update('todoBoxIds', () => List(normalizeTodoBox.result))
        .update('todoBoxEntities', () => fromJS(normalizeTodoBox.entities.TodoBox || {}));

    /* case TODOBOX_CREATE_SUCCESS:
     *   normalize(action.payload, TD);
     *   return {
     *     ...state
     *   };
     */
    default:
      return state;
  }
}
