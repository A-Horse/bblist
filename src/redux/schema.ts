import { schema } from 'normalizr';

export const Comment = new schema.Entity('Comment');
export const Issue = new schema.Entity('Issue', {
  comments: new schema.Array(Comment)
});
export const IssueList = new schema.Array(Issue);

export const ProjectEntity = new schema.Entity('Project');
export const ProjectEntityList = new schema.Array(ProjectEntity);

export const KanbanColumnEntity = new schema.Entity('KanbanColumn', {
  issues: IssueList,
});
export const KanbanColumnEntityList = new schema.Array(KanbanColumnEntity);

export const KanbanEntity = new schema.Entity('Kanban');
export const KanbanEntityList = new schema.Array(KanbanEntity);
export const KanbanDetailEntity = new schema.Entity('Kanban', {
  columns: [KanbanColumnEntity],
});
