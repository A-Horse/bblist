import React from 'react';
import { AppIcon } from '../widget/Icon';
import { Checkbox } from '../widget/CheckBox/CheckBox';
import moment from 'moment';

import './Deadline.scss';

interface InputProps {
  deadline: Date;
}

export function Deadline(props: InputProps) {
  const isLate = moment(props.deadline).isBefore(new Date());
  const color = isLate ? '#FF5050E6' : '#888';
  const timeStr = moment(props.deadline).format('YYYY-MM-D, h:mm:ss a');
  return (
    <div className="Deadline">
      <Checkbox defaultChecked={true} />
      <AppIcon color={color} icon="clock" />
      <span className="Deadline--text" style={{ color: color }}>
        {timeStr}
      </span>
    </div>
  );
}
