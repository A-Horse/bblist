import React from 'react';
import { AppSelect } from '../widget/AppSelect';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersRequest } from '../../actions/user/user.action';
import { RootState } from '../../reducers';
import { findProjectAllUsers } from '../../reducers/selector/user.selector';
import { AppUserInfoRecord } from '../../typings/user/user.typing';
import { SelectOption } from '../../typings/select.typing';

interface InputProps {
  selectedUserId?: string;
  projectID: string;
}

function mapUserToSelectOption(user: AppUserInfoRecord): SelectOption {
  return {
    value: user.get('id'),
    label: user.get('username')
  };
}

export function AssigneeSelector(props: InputProps) {
  const dispatch = useDispatch();
  const onChange = () => {};
  const onMenuOpen = () => {
    dispatch(getAllUsersRequest(props.projectID));
  };

  const userOptions = useSelector((state: RootState) =>
    findProjectAllUsers(state, props.projectID)
  )
    .map(mapUserToSelectOption)
    .toArray();

  return (
    <div className="AssigneeSelector">
      <UserAvatar />
      <AppSelect
        onMenuOpen={onMenuOpen}
        placeholder="分配用户"
        options={userOptions}
        onChange={onChange}
      />
    </div>
  );
}
