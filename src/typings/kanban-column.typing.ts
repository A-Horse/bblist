import { Record, List } from 'immutable';

export interface Column {
    id: string;
    name: string;
}

export type KanbanColumnRecord = Record<{
  id: string;
  name: string;
  order: number;
  cards: List<any>;
}>;
