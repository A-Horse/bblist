import React, { useEffect } from 'react';
import { AppSelect } from '../../widget/AppSelect';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { findProjectAllUsers } from '../../redux/reducer/selector/user.selector';
import { SelectOption } from '../../typings/select.typing';
import { AssigneeSelectorOption } from './AssigneeSelectorOption';

import './AssigneeSelector.scss';
import { getProjectUserRequest } from '../../redux/actions/project.action';
import { DisplayAccount } from '../../typings/user.typing';

interface InputProps {
  selectedUserId?: number | string;
  projectId: string;
  onChange?: Function;
}

function mapUserToSelectOption(user: DisplayAccount): SelectOption {
  return {
    value: user.id,
    label: user.username,
    meta: user,
  };
}

export function AssigneeSelector(props: InputProps) {
  const dispatch = useDispatch();
  const onChange = (option) => {
    props.onChange && props.onChange(option);
  };

  const users = useSelector((state: RootState) =>
    findProjectAllUsers(state, props.projectId)
  );

  const userOptions = users.map(mapUserToSelectOption);

  useEffect(() => {
    dispatch(getProjectUserRequest(props.projectId));
  }, [dispatch, props.projectId]);

  const selectedOption = userOptions.find(
    (o) => o.value === props.selectedUserId
  );

  return (
    <div className="AssigneeSelector">
      <UserAvatar />
      <AppSelect
        // menuIsOpen={true}
        isClearable={true}
        components={{
          Option: AssigneeSelectorOption,
          SingleValue: AssigneeSelectorOption,
        }}
        className="AssigneeSelector-select"
        isSearchable={true}
        placeholder="分配用户"
        value={selectedOption}
        options={userOptions}
        onChange={onChange}
      />
    </div>
  );
}
