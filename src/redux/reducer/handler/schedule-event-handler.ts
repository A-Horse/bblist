import { DataNormalize } from '.';
import { AxiosSuccessAction } from '../../actions/actions';
import { queryScheduleEvents } from '../../actions/schedule.action';
import { ScheduleEventEntityList } from '../../schema';
import { ScheduleEventState } from '../schedule-event.reducer';

export function reduceScheduleEventSuccess(
  state: ScheduleEventState,
  action: AxiosSuccessAction<ReturnType<typeof queryScheduleEvents>>
): ScheduleEventState {
  const dataNormalize = new DataNormalize(action.payload.data, ScheduleEventEntityList);
  const eventEntities = dataNormalize.geEntities('ScheduleEvent');
  return {
    ...state,
    eventMap: {
      ...state.eventMap,
      ...eventEntities,
    },
  };
}
