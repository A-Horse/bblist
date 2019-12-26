import React from 'react';
import { AppSelect } from '../widget/AppSelect';
import { UserAvatar } from '../UserAvatar/UserAvatar';

interface InputProps {
  selectedUserId?: string;
}

export function AssigneeSelector(input: InputProps) {
  const onChange = () => {};

  return (
    <div className="AssigneeSelector">
      <UserAvatar />
      <AppSelect placeholder="分配用户" options={[]} onChange={onChange} />
    </div>
  );
}
