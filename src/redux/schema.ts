import { schema } from 'normalizr';

export const UserEntity = new schema.Entity('User');
export const UserEntityList = new schema.Array(UserEntity);

export const ProjectIssue = new schema.Entity('ProjectIssue');
export const ProjectCardList = new schema.Array(ProjectIssue);

export const ProjectEntity = new schema.Entity('Project');
export const ProjectEntityList = new schema.Array(ProjectEntity);

export const KanbanColumnEntity = new schema.Entity('KanbanColumn');
export const KanbanColumnEntityList = new schema.Array(KanbanColumnEntity);

export const KanbanEntity = new schema.Entity('Kanban');
export const KanbanEntityList = new schema.Array(KanbanEntity);
export const KanbanDetailEntity = new schema.Entity('Kanban', {
  columns: [KanbanColumnEntity],
});
