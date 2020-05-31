import { Record } from 'immutable';

export interface Column {
  id: string;
  name: string;
}

export type KanbanColumnRecord = Record<{
  id: string;
  name: string;
  order: number;
  kanbanId: string;
}>;
