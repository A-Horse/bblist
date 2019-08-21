import { KanbanColumnRecord } from './kanban-column.typing';
import { Record, List } from 'immutable';

export interface Kanban {
  id: string;
  name: string;
}

export type KanbanRecord = Record<{
  id: string;
  name: string;
  columns?: List<KanbanColumnRecord>;
}>;

export interface CreateKanbanInput {
  name: string;
  projectId: string;
}