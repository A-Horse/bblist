import { List, Record } from 'immutable';

export interface IKanbanDisplay {
  id: string;
  name: string;
}

export interface IKanban extends IKanbanDisplay {
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
  projectId: string;
  kanbanId: string;
  name: string;
}
