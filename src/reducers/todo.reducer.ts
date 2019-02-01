import { TDBox, TDS, TDBoxs } from '../schema';
import { normalize } from 'normalizr';
import { List, Map, fromJS, Record } from 'immutable';
import Actions from '../actions/actions';

export interface Todo {
  id: string;
  content: string;
  desc: string;
  deadline: string;
  deletedAt?: string;
  status: 'ACTIVE' | 'DONE';
  type: 'NORMAL';
  isDelete: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface TodoStateProp {
  todoBoxId: any;
  todoIds: any;
  todoEntities: any;
  todoBoxEntities: any;
  todoBoxIds: any;
}

export function todos(
  state = Record<TodoStateProp>({
    todoBoxId: null,
    todoIds: List(),
    todoEntities: Map(),
    todoBoxEntities: Map(),
    todoBoxIds: List()
  })(),
  action: any
) {
  switch (action.type) {
    case Actions.ADD_TODO.SUCCESS:
      const addedTodo = action.payload;
      return state
        .update('todoEntities', (todoEntities: any) =>
          todoEntities.set(String(addedTodo.id), fromJS(addedTodo))
        )
        .update('todoIds', (todoIds: any) => todoIds.push(String(addedTodo.id)));

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
      const toDeletedIndex = state.get('todoIds')!.indexOf(action.meta.id);
      return state.update('todoIds', (ids: any) => ids.delete(toDeletedIndex));

    case Actions.ADD_TODOBOX.SUCCESS:
      const normalizedAddedTodoBox = normalize(action.payload, TDBox);
      return state
        .update('todoBoxEntities', (todoBoxEntities: any) =>
          todoBoxEntities.merge(normalizedAddedTodoBox.entities.TodoBox)
        )
        .update('todoBoxIds', (todoBoxIds: any) => todoBoxIds.push(normalizedAddedTodoBox.result));

    case Actions.GET_TODOBOXS.SUCCESS:
      const normalizeTodoBox = normalize(action.payload, TDBoxs);
      return state
        .update('todoBoxIds', () => List(normalizeTodoBox.result))
        .update('todoBoxEntities', () => fromJS(normalizeTodoBox.entities.TodoBox || {}));

    default:
      return state;
  }
}
