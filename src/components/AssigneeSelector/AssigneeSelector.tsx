import React from 'react';
import { AppSelect } from '../widget/AppSelect';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersRequest } from '../../actions/user/user.action';

interface InputProps {
  selectedUserId?: string;
}

export function AssigneeSelector(input: InputProps) {
  const dispatch = useDispatch();
  const onChange = () => {};
  const onMenuOpen = () => {
    dispatch(getAllUsersRequest());
  };

  // useSelector

  return (
    <div className="AssigneeSelector">
      <UserAvatar />
      <AppSelect onMenuOpen={onMenuOpen} placeholder="分配用户" options={[]} onChange={onChange} />
    </div>
  );
}
