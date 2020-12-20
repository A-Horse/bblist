import React, { useEffect } from 'react';
import { ScheduleCalendar } from './ScheduleCalendar/ScheduleCalendar';
import { useDispatch } from 'react-redux';
import { queryScheduleEvents } from '../../redux/actions/schedule.action';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

import { Flex } from '../../widget/Layout/Flex';
import { generateThisMonthRange } from "./schedule-range-selector";

export function SchedulePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const [startMoment, endMoment] = generateThisMonthRange();
    dispatch(queryScheduleEvents({
      startTime: startMoment.toISOString(),
      endTime: endMoment.toISOString(),
    }));
  }, []);

  return (
    <Flex>
      <div>aside</div>

      <ScheduleCalendar />
    </Flex>
  );
}
