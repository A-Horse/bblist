import { FSAction } from './actions';
import { CreateKanbanColumnInput } from '../../typings/kanban.typing';

export function queryKanbanColumns(kanbanId): FSAction {
  return {
    type: 'QUERY_KANBAN_COLUMNS',
    payload: {
      request: {
        url: `/kanban/${kanbanId}/columns`,
      },
    },
  };
}

export const CREATE_KANBAN_COLUMN_REQUEST = 'CREATE_KANBAN_COLUMN_REQUEST';
export const CREATE_KANBAN_COLUMN_SUCCESS = 'CREATE_KANBAN_COLUMN_SUCCESS';
export const CREATE_KANBAN_COLUMN_FAILURE = 'CREATE_KANBAN_COLUMN_FAILURE';

export function createKanbanColumnRequest(
  createKanbanColumnInput: CreateKanbanColumnInput
): FSAction {
  return {
    type: CREATE_KANBAN_COLUMN_REQUEST,
    payload: createKanbanColumnInput,
  };
}

export function createKanbanColumnSuccess(
  id: string,
  meta: {
    kanbanId: string;
  }
): FSAction {
  return {
    type: CREATE_KANBAN_COLUMN_SUCCESS,
    payload: id,
    meta,
  };
}

export function createKanbanColumnFailure(): FSAction {
  return {
    type: CREATE_KANBAN_COLUMN_FAILURE,
    error: true,
  };
}
