import React from 'react';
import { AppIcon } from '../../widget/Icon';
import { Checkbox } from '../../widget/CheckBox/CheckBox';
import moment from 'moment';

import './Deadline.scss';
import { faClock } from '@fortawesome/free-regular-svg-icons';

interface InputProps {
  deadline: string;
  done: boolean;
  onChange: any;
}

export function Deadline(props: InputProps) {
  const isLate = moment(props.deadline).isBefore(new Date());
  const color = isLate ? '#FF5050E6' : '#888';
  const timeStr = moment(props.deadline).format('YYYY年MM月DD日');
  return (
    <div className="Deadline">
      <Checkbox defaultChecked={props.done} onChange={props.onChange} />

      <div className="Deadline--main">
        <AppIcon color={color} icon={faClock} />
        <span className="Deadline--text" style={{ color: color }}>
          {timeStr}
        </span>
      </div>
    </div>
  );
}
