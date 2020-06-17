export interface IProjectIssue {
  id: string;
  title: string;
  order: number;
  desc?: string;
  columnId: string;
  projectId: string;
  deadline?: string;
  deadlineDone?: boolean;
  assigneeId?: string;
  creatorId?: string;
}

export interface UpdateIssueInput {
  id: string;
  title?: string;
  order?: number;
  desc?: string;
  columnId?: string;
  deadline?: string;
  deadlineDone?: boolean;
  assigneeId?: string;
  creatorId?: string;
}

export type ProjectIssueFiled = keyof IProjectIssue;

export interface CreateProjectIssueInput {
  projectId: string;
  kanbanId?: string;
  columnId?: string;
  title: string;
  content?: string;
}

export interface RankProjectCardInKanbanInput {
  selectCard: IProjectIssue;
  targetCard?: IProjectIssue;
  isBefore?: boolean;
  targetOrder?: number;
  targetColumnId: string;
}
