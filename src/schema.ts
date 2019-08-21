import { schema } from 'normalizr';

export const user = new schema.Entity('user');

export const TaskCard = new schema.Entity('TaskCard');
export const TaskTrack = new schema.Entity('TaskTrack', { cards: [TaskCard] });

export const TaskBoard = new schema.Entity('TaskBoard', {
  tracks: [TaskTrack]
});
export const TaskBoards = new schema.Array(TaskBoard);

export const TD = new schema.Entity('Todo');
export const TDS = new schema.Array(TD);
export const TDBox = new schema.Entity('TodoBox', { todos: TDS });
export const TDBoxs = new schema.Array(TDBox);
export const TDRepeat = new schema.Entity('TodoRepeat');


export const ProjectEntity = new schema.Entity('Project');
export const ProjectEntityList = new schema.Array(ProjectEntity);

export const KanbanEntity = new schema.Entity('Kanban');
export const KanbanEntityList = new schema.Array(KanbanEntity);