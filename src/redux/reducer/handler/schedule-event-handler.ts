import { DataNormalize } from '.';
import { AxiosSuccessAction } from '../../actions/actions';
import { queryScheduleEvents } from '../../actions/schedule.action';
import { ScheduleEventEntityList } from '../../schema';
import { ScheduleEventState } from '../schedule-event.reducer';

export function reduceScheduleEventSuccess(
  state: ScheduleEventState,
  action: AxiosSuccessAction<ReturnType<typeof queryScheduleEvents>>
): ScheduleEventState {
  const events = action.payload.data.map(e => ({...e, start: e.startTime ? new Date(e.startTime) : undefined, end: e.endTime ? new Date(e.endTime): undefined}));// for ui calendar
  const dataNormalize = new DataNormalize(events, ScheduleEventEntityList);
  const eventEntities = dataNormalize.geEntities('ScheduleEvent');
  return {
    ...state,
    eventMap: {
      ...state.eventMap,
      ...eventEntities,
    },
  };
}
