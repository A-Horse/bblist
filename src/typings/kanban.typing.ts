import { IProjectIssue } from './project-issue.typing';

export interface IKanbanDisplay {
  id: string;
  name: string;
}

export interface IKanban extends IKanbanDisplay {
  columns?: any[];
  columnIds?: string[];
  recentlyIssues?: IProjectIssue[];
  recentlyIssueIds?: string[];
}

export interface CreateKanbanInput {
  name: string;
  projectId: string;
}

export interface CreateKanbanColumnInput {
  projectId: string;
  kanbanId: string;
  name: string;
}
