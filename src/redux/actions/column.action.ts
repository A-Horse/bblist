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
    meta: {
      kanbanId: kanbanId,
    },
  };
}

export function createKanbanColumnRequest(
  createKanbanColumnInput: CreateKanbanColumnInput
) {
  return {
    type: `CREATE_KANBAN_COLUMN`,
    payload: {
      request: {
        url: '/column',
        method: 'POST',
        data: createKanbanColumnInput,
      },
    },
  };
}

export function deleteKanbanColumn(id: string) {
  return {
    type: 'DELETE_COLUMN',
    payload: {
      request: {
        url: `/column/${id}`,
        method: 'DELETE',
      },
    },
  };
}
