import { Record } from 'immutable';

export interface ProjectIssue {
  id: string;
  title: string;
  order: number;
  content?: string;
}

export type ProjectIssueRecord = Record<ProjectIssue>;


export type ProjectIssueRecordFiled =  keyof ProjectIssue;

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