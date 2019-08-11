export type ProjectId = string;

export interface Project {
    id: string;
    name: string;
    desc: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProjectInput {
    name: string;
}