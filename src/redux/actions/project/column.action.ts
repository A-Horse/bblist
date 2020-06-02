import { FSAction } from '../actions';

export function queryKanbanColumns(): FSAction {
  return {
    type: 'QUERY_KANBAN_COLUMNS',
    payload: {
      request: {},
    },
  };
}
