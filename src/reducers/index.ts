import { Record } from 'immutable';

import { ProjectProp } from './project.reducer';
import { TodoStateProp } from './todo.reducer';

export interface RootState {
  todo: Record<TodoStateProp>;
  project: Record<ProjectProp>;
}

export { auth } from './auth.reducer';
export { task2 } from './task.reducer';
export { todo } from './todo.reducer';
export { user } from './user.reducer';
export { project } from './project.reducer';
