import { ProjectMap } from "./project.reducer";
import { reduceScheduleEventSuccess } from "./handler/schedule-event-handler";


export interface ScheduleEventState {
  eventMap: ProjectMap;
}

export function scheduleEvent(state: ScheduleEventState = {
  eventMap: {},
}, action) {
  switch (action.type) {
    case 'QUERY_SCHEDULE_EVENTS_SUCCESS':
      return reduceScheduleEventSuccess(state);
    default:
      return state;
  }
}
