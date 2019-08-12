import { Record } from 'immutable';
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
}>;

export interface CreateProjectInput {
    name: string;
}