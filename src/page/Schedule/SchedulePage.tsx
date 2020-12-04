import React, { useEffect } from 'react';
import { ScheduleCalendar } from './ScheduleCalendar/ScheduleCalendar';
import { useDispatch } from 'react-redux';
import { queryScheduleEvents } from '../../redux/actions/schedule.action';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

export function SchedulePage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryScheduleEvents());
  });
  

  return (
    <div>
      <div>
        aside
      </div>
      
      <ScheduleCalendar />
    </div>
  );
}
