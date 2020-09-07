import React from 'react';
import { ScheduleCalendar } from './ScheduleCalendar/ScheduleCalendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

export function SchedulePage() {
  return (
    <div>
      <ScheduleCalendar />
    </div>
  );
}
