import { Record } from 'immutable';

export interface Kanban {
  id: string;
  name: string;
}

export type KanbanRecord = Record<{
  id: string;
  name: string;
}>;
