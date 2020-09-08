import React from 'react';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import _get from 'lodash/get';

export function AssigneeSelectorOption(props: any) {
  const data = props.data;
  const isSelected =
    data.value === _get(props, ['selectProps', 'value', 'value']);
  return (
    <div
      className={`AssigneeSelectorOption App-select__option ${
        isSelected && 'AppRouter-select__option--is-selected'
      }`}
      {...props.innerProps}
    >
      <UserAvatar user={data.meta} />
      <span className="AssigneeSelectorOption--label">{data.label}</span>
    </div>
  );
}
