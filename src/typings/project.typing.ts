import { Record } from 'immutable';

export type ProjectId = string;

export interface ProjectSetting {
  id: string;
  coverFileName: string;
  isStar: boolean;
  defaultKanbanId: string;
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
  kanbans?: string[];
}>;

export interface CreateProjectInput {
  name: string;
}

export interface SetProjectDefaultKanbanInput {
  projectId: string;
  kanbanId: string;
}

export interface UploadProjectCoverInput {
  projectId: string;
  coverBase64: string;
}
