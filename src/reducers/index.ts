import { Record } from 'immutable';

import { ProjectProp } from './project.reducer';
import { TodoStateProp } from './todo.reducer';
import { UserReducerState } from './user.reducer';

export interface RootState {
  todo: Record<TodoStateProp>;
  project: Record<ProjectProp>;
  user: Record<UserReducerState>;
}

export { auth } from './auth.reducer';
export { task2 } from './task.reducer';
export { todo } from './todo.reducer';
export { user } from './user.reducer';
export { project } from './project.reducer';
