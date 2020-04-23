import React from 'react';

import { UserAvatar } from '../UserAvatar/UserAvatar';

export function AssigneeSelectorOption({ data, innerProps }) {
  return (
    <div className="AssigneeSelectorOption" {...innerProps}>
      <UserAvatar user={data.meta.toJS()} />
      <span className="AssigneeSelectorOption--label">{data.label}</span>
    </div>
  );
}
