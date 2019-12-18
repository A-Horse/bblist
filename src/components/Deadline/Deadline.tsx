import React from 'react';
import { AppIcon } from '../widget/Icon';

interface InputProps {
    deadline: Date;
}

export function Deadline(props: InputProps) {
  return (
    <div>
      <AppIcon icon="clock" />
      {props.deadline}
    </div>
  );
}
