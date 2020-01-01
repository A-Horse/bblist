import React from 'react';

import { UserAvatar } from '../UserAvatar/UserAvatar';

export function AssigneeSelectorOption({ data, innerProps }) {
  return (
    <div className="AssigneeSelectorOption" {...innerProps}>
      <UserAvatar user={data.meta.toJS()} />
      {data.label}
    </div>
  );
}
