import { KanbanRecord } from './kanban.typing';
import { Record, List } from 'immutable';
export type ProjectId = string;

export interface ProjectSetting {
  id: string;
  coverUrl: string;
  isStar: boolean;
}

export interface Project {
  id: string;
  name: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  setting: ProjectSetting;
}

export type ProjectRecord = Record<{
  id: string;
  name: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  setting: Record<ProjectSetting>;
  kanbans?: List<KanbanRecord[]>;
}>;

export interface CreateProjectInput {
  name: string;
}
