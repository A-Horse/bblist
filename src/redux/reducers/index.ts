import { Record } from 'immutable';

import { ProjectProp } from './project.reducer';
import { UserReducerState } from './user.reducer';

export interface RootState {
  project: Record<ProjectProp>;
  user: Record<UserReducerState>;
}

export { auth } from './auth.reducer';
export { user } from './user.reducer';
export { project } from './project.reducer';
