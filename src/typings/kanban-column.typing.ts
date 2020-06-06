import { IProjectIssue } from './project-issue.typing';

export interface IColumn {
  id: string;
  name: string;
  kanbanId: string;
  order: number;
  issues?: IProjectIssue[];
}

export interface IColumnNormalized extends Omit<IColumn, 'issues'> {
  issues?: string[];
}
