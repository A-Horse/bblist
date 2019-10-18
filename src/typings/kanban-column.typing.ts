import { ProjectIssueRecord } from './project-issue.typing';
import { Record, List } from 'immutable';

export interface Column {
    id: string;
    name: string;
}

export type KanbanColumnRecord = Record<{
  id: string;
  name: string;
  order: number;
  kanbanId: string;
  cards: List<string>;
}>;
