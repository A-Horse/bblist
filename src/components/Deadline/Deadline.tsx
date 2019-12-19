import React from 'react';
import { AppIcon } from '../widget/Icon';
import {Checkbox} from '../widget/CheckBox/CheckBox';
var moment = require('moment');

interface InputProps {
  deadline: Date;
}

export function Deadline(props: InputProps) {
  const isLate = moment(props.deadline).isBefore(new Date());
  const color = isLate ? 'red' : '#888';
  const timeStr = moment(props.deadline).format("YYYY-MM-D, h:mm:ss a");
  return (
    <div>
      <Checkbox defaultChecked={true} />
      <AppIcon color={color} icon="clock" />
      <span style={{ color: color }}>{timeStr}</span>
    </div>
  );
}
