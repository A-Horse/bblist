import { Record } from 'immutable';
import { TodoStateProp } from './todo.reducer';

export interface RootState {
  todo: Record<TodoStateProp>;
}

export { auth } from './auth.reducer';
export { task2 } from './task.reducer';
export { todo } from './todo.reducer';
export { user } from './user.reducer';
export { project } from './project.reducer';
