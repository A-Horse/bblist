import { IIssue } from './project-issue.typing';

export interface IColumn {
  id: string;
  name: string;
  kanbanId: string;
  order: number;
  issues?: IIssue[];
}

export interface IColumnNormalized extends Omit<IColumn, 'issues'> {
  issues?: string[];
}
