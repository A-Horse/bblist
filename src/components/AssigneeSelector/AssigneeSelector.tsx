import React, { useEffect } from 'react';
import { AppSelect } from '../widget/AppSelect';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersRequest } from '../../actions/user/user.action';
import { RootState } from '../../reducers';
import { findProjectAllUsers } from '../../reducers/selector/user.selector';
import { AppUserInfoRecord } from '../../typings/user/user.typing';
import { SelectOption } from '../../typings/select.typing';
import { AssigneeSelectorOption } from './AssigneeSelectorOption';

import './AssigneeSelector.scss';

interface InputProps {
  selectedUserId?: number;
  projectID: string;
  onChange?: Function;
}

function mapUserToSelectOption(user: AppUserInfoRecord): SelectOption {
  return {
    value: user.get('id'),
    label: user.get('username'),
    meta: user
  };
}

export function AssigneeSelector(props: InputProps) {
  const dispatch = useDispatch();
  const onChange = option => {
    props.onChange && props.onChange(option);
  };

  const users = useSelector((state: RootState) =>
    findProjectAllUsers(state, props.projectID)
  );

  const userOptions = users.map(mapUserToSelectOption).toArray();

  useEffect(() => {
    dispatch(getAllUsersRequest(props.projectID));
  }, []);

  const selectedOption = userOptions.find(
    o => o.value === props.selectedUserId
  );

  return (
    <div className="AssigneeSelector">
      <UserAvatar />
      <AppSelect
        components={{
          Option: AssigneeSelectorOption,
          SingleValue: AssigneeSelectorOption
        }}
        isSearchable={true}
        placeholder="分配用户"
        value={selectedOption}
        options={userOptions}
        onChange={onChange}
      />
    </div>
  );
}
