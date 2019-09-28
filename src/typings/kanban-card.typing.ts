import { Record } from 'immutable';

export interface Card {
  id: string;
  name: string;
}

export type ProjectCardRecord = Record<{
  id: string;
  title: string;
  order: number;
}>;

export interface CreateProjectCardInput {
  title: string;
  content: string;
}

export interface RankProjectCardInKanbanInput {
  selectCard: ProjectCardRecord;
  targetCard: ProjectCardRecord;
  isBefore: boolean;
  targetOrder: number;
}