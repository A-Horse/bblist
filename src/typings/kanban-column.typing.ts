import { List, Record } from 'immutable';

import { ProjectIssueRecord } from './project-issue.typing';

export interface Column {
    id: string;
    name: string;
}

export type KanbanColumnRecord = Record<{
  id: string;
  name: string;
  order: number;
  kanbanId: string;
}>;
