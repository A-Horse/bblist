import { ProjectState } from './project.reducer';
import { UserReducerState } from './user.reducer';
import { ScheduleEventState } from './schedule-event.reducer';

export interface RootState {
  project: ProjectState;
  user: UserReducerState;
  scheduleEvent: ScheduleEventState;
}

export { user } from './user.reducer';
export { project } from './project.reducer';
export { scheduleEvent } from './schedule-event.reducer';
