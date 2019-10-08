import { Record } from 'immutable';

export interface Card {
  id: string;
  name: string;
}

export type ProjectIssueRecord = Record<{
  id: string;
  title: string;
  order: number;
}>;

export interface CreateProjectCardInput {
  title: string;
  content: string;
}

export interface RankProjectCardInKanbanInput {
  selectCard: ProjectIssueRecord;
  targetCard: ProjectIssueRecord;
  isBefore: boolean;
  targetOrder: number;
}