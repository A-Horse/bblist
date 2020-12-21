import moment from 'moment';
import { RootState } from '..';
import { IScheduleEvent } from '../../../typings/schedule-event.typing';

export function selectScheduleEvents(rootState: RootState, filterOption: {
    startTime?: Date;
    endTime?: Date;
} = {}): IScheduleEvent[] {
  return Object.values(rootState.scheduleEvent.eventMap).filter((event) => {
    if (filterOption.startTime && moment(filterOption.startTime).isAfter(moment(event.startTime))) {
      return false;
    }
    if (filterOption.endTime && moment(filterOption.endTime).isBefore(moment(event.endTime))) {
      return false;
    }
    return true;
  });
}
