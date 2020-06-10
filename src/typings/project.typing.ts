import { IKanbanDisplay } from './kanban.typing';

export type ProjectId = string;

export interface IProject {
  id: string;
  name: string;
  desc: string;
  coverUri: string;
  kanbans?: IKanbanDisplay[];
  kanbanIds?: string[];
  createdAt: Date;
}

export interface UpdateProjectRequest {
  id: string;
  name?: string;
}
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
