import { Record } from 'immutable';

export interface Issue {
  id: string;
  title: string;
  order: number;
}

export type ProjectIssueRecord = Record<Issue>;

export type ProjectIssueRecordFiled =  keyof Issue;

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