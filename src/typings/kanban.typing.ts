import { List, Record } from 'immutable';

export interface Kanban {
  id: string;
  name: string;
  columns?: any[];
}

export type KanbanRecord = Record<{
  id: string;
  name: string;
  columns?: List<string>;
}>;

export interface CreateKanbanInput {
  name: string;
  projectId: string;
}

export interface CreateKanbanColumnInput {
  name: string;
}
