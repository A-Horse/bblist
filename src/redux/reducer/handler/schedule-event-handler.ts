import { AxiosSuccessAction } from "../../actions/actions";
import { queryScheduleEvents } from "../../actions/schedule.action";
import { ScheduleEventState } from "../schedule-event.reducer";


export function reduceScheduleEventSuccess(
  state: ScheduleEventState,
  action: AxiosSuccessAction<ReturnType<typeof queryScheduleEvents>>): ScheduleEventState {
  return state;
}
