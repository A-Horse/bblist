import { Record } from 'immutable';

export interface ProjectIssue {
  id: string;
  title: string;
  order: number;
  content?: string;
  columnId: string;
  deadline?: string;
  deadlineDone?: boolean;
}

export type ProjectIssueRecord = Record<ProjectIssue>;

export type ProjectIssueRecordFiled = keyof ProjectIssue;

export interface CreateProjectIssueInput {
  projectID: string;
  kanbanID?: string;
  columnID?: string;
  title: string;
  content?: string;
}

export interface RankProjectCardInKanbanInput {
  selectCard: ProjectIssueRecord;
  targetCard?: ProjectIssueRecord;
  isBefore?: boolean;
  targetOrder?: number;
  targetColumnId: string;
}
