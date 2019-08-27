import { Record } from 'immutable';

export interface Card {
  id: string;
  name: string;
}

export type KanbanCardRecord = Record<{
  id: string;
  title: string;
}>;

export interface CreateProjectCardInput {
  title: string;
  content: string;
}
