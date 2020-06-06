export interface IProjectIssue {
  id: string;
  title: string;
  order: number;
  content?: string;
  columnId: string;
  deadline?: string;
  deadlineDone?: boolean;
  assigneeId?: string;
  creatorId?: string;
}

export type ProjectIssueFiled = keyof IProjectIssue;

export interface CreateProjectIssueInput {
  projectID: string;
  kanbanID?: string;
  columnID?: string;
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
