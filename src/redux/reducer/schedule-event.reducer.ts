import { reduceScheduleEventSuccess } from './handler/schedule-event-handler';
import { IScheduleEvent } from '../../typings/schedule-event.typing';

export interface ScheduleEventMap {
  [id: string]: IScheduleEvent;
}

export interface ScheduleEventState {
  eventMap: ScheduleEventMap;
}


export function scheduleEvent(state: ScheduleEventState = {
  eventMap: {},
}, action): ScheduleEventState {
  switch (action.type) {
    case 'QUERY_SCHEDULE_EVENTS_SUCCESS':
      return reduceScheduleEventSuccess(state, action);
    default:
      return state;
  }
}
